import { Router, Express } from "express";
import healthCheck from "./api-health-check";

export const routes = (app: Express) => {
  const router = Router();

  router.get("/", healthCheck.get);

  app.use("/api", router);
};
