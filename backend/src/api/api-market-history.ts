import axios from "axios";
import { Request, Response } from "express";
import { assetNames, currencyNames } from "../const/assets";
import { getHourlyHistoryDataForOneDay } from "../controller/historyData";
import { APIError } from "../utils/error";
import { unhandledException } from "../utils/unhandledException";

const getHistoricData = async (req: Request, res: Response) => {
  try {
    const { asset, currency } = req.query;
    const { data } = await getHourlyHistoryDataForOneDay(asset, currency);

    if (data.Response === "Error") {
      throw new APIError(
        `Unable to get data for asset: ${asset} in currency: ${currency}`
      );
    }

    return res.status(200).json({ data: data.Data.Data });
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
