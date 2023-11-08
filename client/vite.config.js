import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const cherryPickedKeys = [
  "REACT_APP_API_LINK",
  "REACT_APP_SMPT_HOST",
  "REACT_APP_SMPT_USERNAME",
  "REACT_APP_SMPT_PASSWORD",
  "REACT_APP_SMPT_FROM",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const processEnv = {};
  cherryPickedKeys.forEach((key) => (processEnv[key] = env[key]));

  return {
    define: {
      "process.env": processEnv,
    },
    plugins: [react()],
    server: {
      port: 5173,
      cors: true,
      hmr: {
        overlay: true,
      },
      mimeTypes: [
        {
          ext: ".js",
          mime: "application/javascript",
        },
        {
          ext: ".json",
          mime: "application/json",
        },
        {
          ext: ".woff",
          mime: "font/woff",
        },
        {
          ext: ".woff2",
          mime: "font/woff2",
        },
      ],
    },
  };
});
