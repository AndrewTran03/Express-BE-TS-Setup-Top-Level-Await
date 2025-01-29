import { readdir } from "fs/promises";
import express from "express";
import { APP_ROUTER } from "./routes/index.js";

const files = await readdir(".");
console.log("Top-Level Await works!");
for (const file of files) {
    console.log(file);
}

console.log("Hello World");

const app = express();
app.use(APP_ROUTER);


console.log("Hello World #2");

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
