/**
 * Necessary Back-End Configuration Properties (using NPM "config")
 * @type {import("./types.js").Config} config
 */
const config = {
  frontendClientPort: process.env.FRONTEND_PORT,
  frontendClientUrl: `http://localhost:${process.env.FRONTEND_PORT}`,
  backendServerPort: process.env.BACKEND_PORT,
  backendServerUrl: `http://localhost:${process.env.BACKEND_PORT}`
};

export default config;
