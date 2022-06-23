import { Request, Response } from "express";

const healthCheck = (req: Request, res: Response) => {
  return res.status(200).json({ message: "health check" });
};

export default {
  get: healthCheck,
};
