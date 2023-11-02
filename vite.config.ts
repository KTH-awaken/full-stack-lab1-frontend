import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            find: "@",
            replacement: fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    server: {
        watch: {
            usePolling: true,
        },
        host: true, // Docker Container port mapping
        strictPort: true,
        port: 3000,
    },
    optimizeDeps: {
        exclude: ["js-big-decimal"],
    },
});
