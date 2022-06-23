import { Router, Express } from "express";
import healthCheck from "./api-health-check";
import marketData from "./api-market-data";
import marketHistory from "./api-market-history";
import {
  apiGetMarketDataValidation,
  apiGetMarketHistoryValidation,
} from "./validation";

export const routes = (app: Express) => {
  const router = Router();

  router.get("/", healthCheck.get);

  router.get("/market-data", apiGetMarketDataValidation, marketData.get);

  router.get(
    "/market-history",
    apiGetMarketHistoryValidation,
    marketHistory.get
  );

  app.use("/api", router);
};
