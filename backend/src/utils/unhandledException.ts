import { Request, Response } from "express";

export const unhandledException = (
  err: unknown,
  req: Request,
  res: Response
) => {
  console.debug(err);
  return res.status(500).json({
    message: "Internal Server Error",
  });
};
