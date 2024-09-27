import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		name: 'unit',
		root: './dist_test/tests/unit/',
		setupFiles: ['./core/impl/vitest/runner/setup.js'],
		include: ['./groups/**/**/group.tests.js', './features/**/feature.js'],
		alias: {
			'#corevitest/': './core/impl/vitest/',
		},
	},
})
