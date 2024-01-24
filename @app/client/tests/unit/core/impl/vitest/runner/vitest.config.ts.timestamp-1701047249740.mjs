// tests/unit/core/impl/vitest/runner/vitest.config.ts
import { defineConfig as defineConfig2, mergeConfig } from "file:///E:/Daniel-Pc/Dev-Pro/nodejs/monorepo/node_modules/.pnpm/vitest@0.34.6_jsdom@22.1.0/node_modules/vitest/dist/config.js";

// vite.config.ts
import { defineConfig } from "file:///E:/Daniel-Pc/Dev-Pro/nodejs/monorepo/node_modules/.pnpm/vite@4.0.4_@types+node@18.11.18/node_modules/vite/dist/node/index.js";
import react from "file:///E:/Daniel-Pc/Dev-Pro/nodejs/monorepo/node_modules/.pnpm/@vitejs+plugin-react@3.0.1_vite@4.0.4/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "src",
        replacement: "./src"
      },
      {
        find: "tests",
        replacement: "./tests"
      }
    ]
  }
});

// tests/unit/core/impl/vitest/runner/vitest.config.ts
var vitest_config_default = mergeConfig(
  vite_config_default,
  defineConfig2({
    test: {
      name: "unit",
      root: "./tests/unit/suits",
      setupFiles: ["../core/impl/vitest/runner/setup.ts"],
      include: ["./**/suit.tests.ts"],
      alias: {
        "src/": "../../../../../src/",
        "tests/": "../../../../../tests/"
      }
    }
  })
);
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidGVzdHMvdW5pdC9jb3JlL2ltcGwvdml0ZXN0L3J1bm5lci92aXRlc3QuY29uZmlnLnRzIiwgInZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcRGFuaWVsLVBjXFxcXERldi1Qcm9cXFxcbm9kZWpzXFxcXG1vbm9yZXBvXFxcXEBhcHBcXFxcY2xpZW50XFxcXHRlc3RzXFxcXHVuaXRcXFxcY29yZVxcXFxpbXBsXFxcXHZpdGVzdFxcXFxydW5uZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXERhbmllbC1QY1xcXFxEZXYtUHJvXFxcXG5vZGVqc1xcXFxtb25vcmVwb1xcXFxAYXBwXFxcXGNsaWVudFxcXFx0ZXN0c1xcXFx1bml0XFxcXGNvcmVcXFxcaW1wbFxcXFx2aXRlc3RcXFxccnVubmVyXFxcXHZpdGVzdC5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L0RhbmllbC1QYy9EZXYtUHJvL25vZGVqcy9tb25vcmVwby9AYXBwL2NsaWVudC90ZXN0cy91bml0L2NvcmUvaW1wbC92aXRlc3QvcnVubmVyL3ZpdGVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIG1lcmdlQ29uZmlnIH0gZnJvbSAndml0ZXN0L2Rpc3QvY29uZmlnJ1xyXG5pbXBvcnQgdml0ZUNvbmZpZyBmcm9tICcuLi4vLi4vLi4vdml0ZS5jb25maWcnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBtZXJnZUNvbmZpZyhcclxuICAgIHZpdGVDb25maWcsXHJcbiAgICBkZWZpbmVDb25maWcoe1xyXG4gICAgICAgIHRlc3Q6IHtcclxuICAgICAgICAgICAgbmFtZTogJ3VuaXQnLFxyXG4gICAgICAgICAgICByb290OiAnLi90ZXN0cy91bml0L3N1aXRzJyxcclxuICAgICAgICAgICAgc2V0dXBGaWxlczogWycuLi9jb3JlL2ltcGwvdml0ZXN0L3J1bm5lci9zZXR1cC50cyddLFxyXG4gICAgICAgICAgICBpbmNsdWRlOiBbJy4vKiovc3VpdC50ZXN0cy50cyddLFxyXG4gICAgICAgICAgICBhbGlhczoge1xyXG4gICAgICAgICAgICAgICAgJ3NyYy8nOiAnLi4vLi4vLi4vLi4vLi4vc3JjLycsXHJcbiAgICAgICAgICAgICAgICAndGVzdHMvJzogJy4uLy4uLy4uLy4uLy4uL3Rlc3RzLycsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgIH0pLFxyXG4pXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcRGFuaWVsLVBjXFxcXERldi1Qcm9cXFxcbm9kZWpzXFxcXG1vbm9yZXBvXFxcXEBhcHBcXFxcY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxEYW5pZWwtUGNcXFxcRGV2LVByb1xcXFxub2RlanNcXFxcbW9ub3JlcG9cXFxcQGFwcFxcXFxjbGllbnRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L0RhbmllbC1QYy9EZXYtUHJvL25vZGVqcy9tb25vcmVwby9AYXBwL2NsaWVudC92aXRlLmNvbmZpZy50c1wiOy8vLyA8cmVmZXJlbmNlIHR5cGVzPVwidml0ZXN0XCIgLz5cclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgICBhbGlhczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmaW5kOiAnc3JjJyxcclxuICAgICAgICAgICAgICAgIHJlcGxhY2VtZW50OiAnLi9zcmMnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmaW5kOiAndGVzdHMnLFxyXG4gICAgICAgICAgICAgICAgcmVwbGFjZW1lbnQ6ICcuL3Rlc3RzJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgfSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5YyxTQUFTLGdCQUFBQSxlQUFjLG1CQUFtQjs7O0FDQ25mLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0g7QUFBQSxRQUNJLE1BQU07QUFBQSxRQUNOLGFBQWE7QUFBQSxNQUNqQjtBQUFBLE1BQ0E7QUFBQSxRQUNJLE1BQU07QUFBQSxRQUNOLGFBQWE7QUFBQSxNQUNqQjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0osQ0FBQzs7O0FEaEJELElBQU8sd0JBQVE7QUFBQSxFQUNYO0FBQUEsRUFDQUMsY0FBYTtBQUFBLElBQ1QsTUFBTTtBQUFBLE1BQ0YsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sWUFBWSxDQUFDLHFDQUFxQztBQUFBLE1BQ2xELFNBQVMsQ0FBQyxvQkFBb0I7QUFBQSxNQUM5QixPQUFPO0FBQUEsUUFDSCxRQUFRO0FBQUEsUUFDUixVQUFVO0FBQUEsTUFDZDtBQUFBLElBQ0o7QUFBQSxFQUNKLENBQUM7QUFDTDsiLAogICJuYW1lcyI6IFsiZGVmaW5lQ29uZmlnIiwgImRlZmluZUNvbmZpZyJdCn0K
