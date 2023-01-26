import { Router } from "express";
import app from "./app";

const router = Router();

router.use("/app", app);

router.use((_req, res) => {
  res.status(404).end();
});

export default router;
