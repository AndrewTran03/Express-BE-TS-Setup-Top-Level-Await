import dotenv from "dotenv";
import path from "path";

import LOGGER from "./utils/logger.js";

let ENV_FILE_PATH = "";
if (process.env["NODE_ENV"] === "development") {
  ENV_FILE_PATH = "../.env.development";
} else if (process.env["NODE_ENV"] === "production" || process.env["NODE_ENV"] === "staging") {
  ENV_FILE_PATH = "../.env.production";
} else {
  LOGGER.error('Invalid configuration for the "NODE_ENV" variable:');
  LOGGER.error(process.env["NODE_ENV"]);
  process.exit(1);
}

const DIR_NAME = import.meta.dirname;
LOGGER.info(`Current directory: ${DIR_NAME}`);

LOGGER.debug(`Environment file path: ${ENV_FILE_PATH}`);

dotenv.config({
  path: path.resolve(DIR_NAME, ENV_FILE_PATH)
});

/* eslint-disable import/first */
import bodyParser from "body-parser";
import config from "config";
import cors from "cors";
import express, { NextFunction } from "express";
import { readdir } from "fs/promises";
import http from "http";
import util from "util";

import { APP_ROUTER } from "./routes/index.js";

// TEST CODE for "Top-Level Await"
const files = await readdir(".");
LOGGER.debug("Top-Level Await works!");
LOGGER.debug("Files in the current directory:");
for (const file of files) {
  LOGGER.debug(file);
}

LOGGER.trace("'Config' Internal Object Properties:");
LOGGER.trace(util.inspect(config, { depth: null }));

// Fallback in case of invalid '.env.*' file configuration
if (Object.values(config).includes("undefined")) {
  LOGGER.error(".env File did NOT load correctly or improper setting of '.env' file properties");
  LOGGER.error("Exiting server now before future crash...");
  process.exit(1);
}

const app = express();
app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));
app.use(cors({ credentials: true }));
app.use(APP_ROUTER);
app.use((_, res, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, TRACE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const server = http.createServer(app);

const backendServerPort = config.get<number>("backendServerPort");
const backendServerUrl = config.get<string>("backendServerUrl");
LOGGER.debug(`BACKEND SERVER PORT is...${backendServerPort} and BACKEND SERVER URL is...${backendServerUrl}`);

// Check if backend port has been properly identified before starting Express backend server
// Quit starting the server if not properly defined (AKA "undefined")
if (!backendServerPort || backendServerPort.toString() === "undefined" || !parseInt(backendServerPort.toString())) {
  LOGGER.error(`BACKEND SERVER PORT is not defined: ${backendServerPort}`);
  process.exit(1);
}

server.listen(backendServerPort, () => {
  LOGGER.warn(`BACKEND SERVER PORT is...${backendServerPort}`);
  LOGGER.info(`Server started on ${backendServerUrl}`);
});
