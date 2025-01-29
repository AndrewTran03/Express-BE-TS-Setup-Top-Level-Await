import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  return res.status(200).send({ message: "Hello World" });
});

export { router as TEST_ROUTER };
