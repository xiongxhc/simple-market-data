import { Request, Response } from "express";
import { getHourlyHistoryDataForOneDay } from "../controller/historyData";
import { APIError } from "../utils/error";
import { unhandledException } from "../utils/unhandledException";

interface MarketHistoryData {
  time: string;
  price: number;
}

export const sequalizeMarketHistoryData = (data): MarketHistoryData[] => {
  return data.map((i) => {
    return {
      time: new Date(i.time * 1000).toLocaleString(),
      price: i.open,
    };
  });
};

const getHistoricData = async (req: Request, res: Response) => {
  try {
    const { asset, currency } = req.query;
    const { data } = await getHourlyHistoryDataForOneDay(asset, currency);

    if (data.Response === "Error") {
      throw new APIError(
        `Unable to get data for asset: ${asset} in currency: ${currency}`
      );
    }

    return res.status(200).json({ data: sequalizeMarketHistoryData(data.Data.Data) });
  } catch (err) {
    if (err instanceof APIError) {
      return res.status(500).json({
        message: err.message,
      });
    }
    return unhandledException(err, req, res);
  }
};

export default {
  get: getHistoricData,
};
