import { defineConfig, mergeConfig } from 'vitest/dist/config'
import viteConfig from '.../../../vite.config'

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            name: 'unit',
            root: './tests/unit/suits',
            setupFiles: ['../core/impl/vitest/runner/setup.ts'],
            include: ['./**/suit.tests.ts'],
        },
    }),
)
