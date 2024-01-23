export const getCallStack = (): string[] => {
    const _pst = Error.prepareStackTrace
    Error.prepareStackTrace = (_err, stack) => stack
    const err: any = new Error()
    err.stack.shift()
    Error.prepareStackTrace = _pst
    return err.stack
}
