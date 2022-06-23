import { Router, Express } from "express";

export const routes = (app: Express) => {
  const router = Router();

  app.use("/api", router);
};
