import { Request, Response, Router } from "express";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    res.send({
      sample: "Sample Data",
    });
  } catch (err) {
    console.error(err);
  }
});

export default router;
