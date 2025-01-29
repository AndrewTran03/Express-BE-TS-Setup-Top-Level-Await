import { Router } from "express";

export type Person = {
  name: string;
  age: number;
};

const router = Router();

router.get("/api/person", (_, res) => {
  const person: Person = {
    name: "John Doe",
    age: 30
  };
  return res.status(200).json(person);
});

export { router as PERSON_ROUTER };
