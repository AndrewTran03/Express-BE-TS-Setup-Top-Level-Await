import { Router } from "express";
import { TEST_ROUTER } from "./test.js";
import { PERSON_ROUTER } from "./person.js";

const router = Router();

router.use(TEST_ROUTER);
router.use(PERSON_ROUTER);

export { router as APP_ROUTER };