import { Router } from "express";

import { PERSON_ROUTER } from "./person.js";
import { TEST_ROUTER } from "./test.js";

const router = Router();

router.use(TEST_ROUTER);
router.use(PERSON_ROUTER);

export { router as APP_ROUTER };
