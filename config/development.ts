// Necessary Back-End Configuration Properties (using NPM "config")
import { Config } from "./types.js";

const config: Config = {
  frontendClientPort: `${process.env.FRONTEND_PORT}`,
  frontendClientUrl: `http://localhost:${process.env.FRONTEND_PORT}`,
  backendServerPort: `${process.env.BACKEND_PORT}`,
  backendServerUrl: `http://localhost:${process.env.BACKEND_PORT}`
};

export default config;
