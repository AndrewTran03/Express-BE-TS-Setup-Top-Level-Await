import { Router } from "express";
import { TEST_ROUTER } from "./test";

const router = Router();

router.use(TEST_ROUTER);

export { router as APP_ROUTER };