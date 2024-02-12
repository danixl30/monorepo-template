// vite.config.ts
import { defineConfig } from "file:///E:/Daniel-Pc/Dev-Pro/nodejs/monorepo/node_modules/.pnpm/vite@4.0.4_@types+node@20.11.5/node_modules/vite/dist/node/index.js";
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
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxEYW5pZWwtUGNcXFxcRGV2LVByb1xcXFxub2RlanNcXFxcbW9ub3JlcG9cXFxcQGFwcFxcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXERhbmllbC1QY1xcXFxEZXYtUHJvXFxcXG5vZGVqc1xcXFxtb25vcmVwb1xcXFxAYXBwXFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovRGFuaWVsLVBjL0Rldi1Qcm8vbm9kZWpzL21vbm9yZXBvL0BhcHAvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW3JlYWN0KCldLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZpbmQ6ICdzcmMnLFxyXG4gICAgICAgICAgICAgICAgcmVwbGFjZW1lbnQ6ICcuL3NyYycsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZpbmQ6ICd0ZXN0cycsXHJcbiAgICAgICAgICAgICAgICByZXBsYWNlbWVudDogJy4vdGVzdHMnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICB9LFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSDtBQUFBLFFBQ0ksTUFBTTtBQUFBLFFBQ04sYUFBYTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0ksTUFBTTtBQUFBLFFBQ04sYUFBYTtBQUFBLE1BQ2pCO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
