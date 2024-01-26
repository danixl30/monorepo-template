import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import chokidar from 'chokidar'
import ts from 'typescript'
import { ChildProcess, exec } from 'node:child_process'
import { rimrafSync } from 'rimraf'

export interface Opts {
    isDeclaration?: boolean
}

function visitor(
    { isDeclaration }: Opts,
    ctx: ts.TransformationContext,
    sf: ts.SourceFile,
) {
    const paths = ctx.getCompilerOptions().paths || {}
    const visitor: ts.Visitor = (node: ts.Node): ts.Node | undefined => {
        if (
            (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
            node.moduleSpecifier
        ) {
            let pathImport = node.moduleSpecifier
                .getText(sf)
                .replaceAll("'", '')
                .replaceAll('"', '')
            const pathMatched = Object.keys(paths)
                .map((e) => e.replace('*', ''))
                .find((e) => pathImport.startsWith(e))
            if (pathMatched) {
                const baseUrl = ctx.getCompilerOptions().baseUrl || ''
                const current = ((sf as any).resolvedPath || sf.fileName)
                    .replaceAll('\\', '/')
                    .split('/')
                current.splice(-1)
                const currentPath = current.join(
                    process.platform === 'win32' ? '\\' : '/',
                )
                paths[pathMatched + '*'].find((path) => {
                    pathImport = resolve(
                        baseUrl,
                        pathImport.replace(pathMatched, path.replace('*', '')),
                    )
                    let fileName: string | undefined
                    if (existsSync(pathImport + '.ts')) {
                        const pathItems = pathImport
                            .replaceAll('\\', '/')
                            .split('/')
                        fileName = pathItems.at(-1)
                        pathItems.splice(-1)
                        pathImport = pathItems.join(
                            process.platform === 'win32' ? '\\' : '/',
                        )
                    }
                    pathImport = relative(currentPath, pathImport).replaceAll(
                        '\\',
                        '/',
                    )
                    if (!pathImport.startsWith('../'))
                        pathImport = './' + pathImport
                    if (fileName && pathImport !== './')
                        pathImport += '/' + fileName
                    if (fileName && pathImport === './') pathImport += fileName
                })
            }
            if (pathImport.startsWith('./') || pathImport.startsWith('../')) {
                const current = ((sf as any).resolvedPath || sf.fileName)
                    .replaceAll('\\', '/')
                    .split('/')
                current.splice(-1)
                const currentPath = current.join(
                    process.platform !== 'win32' ? '/' : '\\',
                )
                let path = join(currentPath, pathImport) + '.ts'
                if (process.platform === 'win32') {
                    path = path.replaceAll('/', '\\')
                    path = path.charAt(0).toUpperCase() + path.slice(1)
                }
                if (existsSync(path)) {
                    pathImport += '.js'
                } else {
                    pathImport += '/index.js'
                }
            }
            if (ts.isImportDeclaration(node)) {
                const newNode = ctx.factory.updateImportDeclaration(
                    node,
                    node.modifiers,
                    node.importClause,
                    ctx.factory.createStringLiteral(pathImport),
                    node.assertClause,
                )
                return newNode
            }
            if (ts.isExportDeclaration(node))
                return ctx.factory.updateExportDeclaration(
                    node,
                    node.modifiers,
                    node.isTypeOnly,
                    node.exportClause,
                    ctx.factory.createStringLiteral(pathImport),
                    node.assertClause,
                )
            return ts.visitEachChild(node, visitor, ctx)
        }
        return ts.visitEachChild(node, visitor, ctx)
    }

    return visitor
}

const transformTest = (
    ctx: ts.TransformationContext,
): ts.Transformer<ts.SourceFile> => {
    return ((sf: ts.SourceFile) => {
        const importsToAdd: string[] = []
        const testVisitor = (
            ctx: ts.TransformationContext,
            sf: ts.SourceFile,
        ) => {
            const visitor = (node: ts.Node): ts.Node | undefined => {
                if (
                    ts.isExportDeclaration(node) &&
                    sf.fileName.endsWith('/index.ts')
                ) {
                    const fileTag =
                        node.moduleSpecifier
                            ?.getText()
                            .replace('./', '')
                            .replaceAll("'", '')
                            .replaceAll('"', '') + '.extension.ts'
                    const current = (sf as any).resolvedPath
                        .replaceAll('\\', '/')
                        .split('/')
                    current.splice(-1)
                    const currentPath = current.join(
                        process.platform !== 'win32' ? '/' : '\\',
                    )
                    const files = readdirSync(currentPath)
                        .filter((e) => e.endsWith(fileTag))
                        .map((e) => './' + e.replace('.ts', ''))
                    if (!files.length) {
                        return ts.visitEachChild(node, visitor, ctx)
                    }
                    const printer = ts.createPrinter({
                        newLine: ts.NewLineKind.LineFeed,
                    })
                    const imports = files
                        .map((e) =>
                            ctx.factory.createImportDeclaration(
                                undefined,
                                undefined,
                                ts.factory.createStringLiteral(e) as any,
                            ),
                        )
                        .map((e) => {
                            return printer.printNode(
                                ts.EmitHint.Unspecified,
                                e,
                                sf,
                            )
                        })
                        .map((e) => (e += '\n'))
                    importsToAdd.push(...imports)
                }
                return ts.visitEachChild(node, visitor, ctx)
            }
            return visitor
        }
        const node = ts.visitNode(sf, testVisitor(ctx, sf))
        if (importsToAdd.length) {
            const normalVisitor: any = (node: ts.Node) =>
                ts.visitEachChild(node, normalVisitor, ctx)
            const newSource = ts.createSourceFile(
                sf.fileName,
                importsToAdd.join('') + sf.getFullText(),
                {
                    ...ctx.getCompilerOptions(),
                    languageVersion:
                        ctx.getCompilerOptions().target ||
                        ts.ScriptTarget.ESNext,
                },
                true,
            )
            return ts.visitNode(newSource, (node) =>
                ts.visitEachChild(node, normalVisitor, ctx),
            )
        }
        return node
    }) as unknown as any
}

export function transform(opts: Opts): ts.TransformerFactory<ts.SourceFile> {
    return (ctx: ts.TransformationContext): ts.Transformer<ts.SourceFile> => {
        return ((sf: ts.SourceFile) =>
            ts.visitNode(sf, visitor(opts, ctx, sf))) as unknown as any
    }
}

const CJS_CONFIG: ts.CompilerOptions = {
    noEmitOnError: true,
    noImplicitAny: true,
    strict: true,
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Node10,
    resolveJsonModule: true,
    esModuleInterop: true,
    allowArbitraryExtensions: true,
    outDir: join(process.cwd(), './dist'),
    allowSyntheticDefaultImports: true,
    declaration: true,
}

function compile(): void {
    const customTsConfig = process.argv.findIndex((e) => e === '--project') + 1
    const tsConfigPath = join(
        process.cwd(),
        process.argv[customTsConfig || -1] || './tsconfig.json',
    )
    const host: ts.ParseConfigFileHost = ts.sys as any
    const parsedCmd = ts.getParsedCommandLineOfConfigFile(
        tsConfigPath,
        undefined,
        host,
    )
    const tsConfigParsed = JSON.parse(readFileSync(tsConfigPath, 'utf8'))
    const compiler = () => {
        const parsedCmd = ts.getParsedCommandLineOfConfigFile(
            tsConfigPath,
            undefined,
            host,
        )
        if (parsedCmd?.fileNames && parsedCmd.options.rootDir)
            parsedCmd.fileNames = parsedCmd.fileNames.filter((e) =>
                e.includes(parsedCmd.options.rootDir || ''),
            )
        if (parsedCmd?.options.outDir && tsConfigParsed.tscc?.deleteOutDir) {
            rimrafSync(parsedCmd.options.outDir)
        }
        const program = ts.createProgram(
            parsedCmd?.fileNames || [],
            parsedCmd?.options || CJS_CONFIG,
        )
        const emitResult = program.emit(
            undefined,
            undefined,
            undefined,
            undefined,
            {
                after: [transform({})],
                before: [transformTest],
            },
        )

        const allDiagnostics = ts
            .getPreEmitDiagnostics(program)
            .concat(emitResult.diagnostics)

        allDiagnostics.forEach((diagnostic) => {
            if (diagnostic.file) {
                const { line, character } = ts.getLineAndCharacterOfPosition(
                    diagnostic.file,
                    diagnostic.start!,
                )
                const message = ts.flattenDiagnosticMessageText(
                    diagnostic.messageText,
                    '\n',
                )
                console.log(
                    `${diagnostic.file.fileName} (${line + 1},${
                        character + 1
                    }): ${message}`,
                )
            } else {
                console.log(
                    ts.flattenDiagnosticMessageText(
                        diagnostic.messageText,
                        '\n',
                    ),
                )
            }
        })
        return emitResult.emitSkipped
    }
    if (process.argv.some((e) => e === '-w' || e === '--watch')) {
        let currentPostJob: ChildProcess | null = null
        console.log('Compiling in watch mode')
        const job = () => {
            if (compiler()) return
            console.log('Successfull!!!')
            if (!tsConfigParsed.tscc?.postWatch) return
            const child = exec(tsConfigParsed.tscc.postWatch)
            child.stdout?.on('data', (data) =>
                console.log(
                    data
                        .trim()
                        .split('\n')
                        .map((e: string) => `[POST] ${e}`)
                        .join('\n'),
                ),
            )
            currentPostJob = child
        }
        const ignoredPaths = [
            ...((tsConfigParsed.tscc.excludesWatch as string[]) || []),
            ...((tsConfigParsed.exclude as string[]) || []),
        ].map((e) => join(parsedCmd?.options.rootDir || process.cwd(), e))
        if (parsedCmd?.options.outDir)
            ignoredPaths.push(parsedCmd.options.outDir)
        ignoredPaths.push(join(process.cwd(), './node_modules'))
        const callback = () => {
            currentPostJob?.kill()
            currentPostJob = null
            console.log('Recompiling...')
            job()
        }
        job()
        const watcher = chokidar.watch(
            [
                ...(tsConfigParsed.include?.map((e: string) =>
                    join(parsedCmd?.options.rootDir || process.cwd(), e),
                ) || [parsedCmd?.options.rootDir] || [process.cwd()]),
                tsConfigPath,
                join(process.cwd(), './package.json'),
            ],
            {
                ignoreInitial: true,
            },
        )
        watcher.unwatch(ignoredPaths)
        watcher.on('all', callback)
        return
    }
    const emitResult = compiler()
    const exitCode = emitResult ? 1 : 0
    console.log(`Process exiting with code '${exitCode}'.`)
    process.exit(exitCode)
}

compile()
