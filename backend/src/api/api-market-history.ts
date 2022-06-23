import axios from "axios";
import { Request, Response } from "express";
import { assetNames, currencyNames } from "../const/assets";
import { getHourlyHistoryDataForOneDay } from "../controller/historyData";
import { APIError } from "../utils/error";
import { unhandledException } from "../utils/unhandledException";

export interface GetHistoryDataParams {
  asset: assetNames;
  currency: currencyNames;
}

const getHistoricData = async (req: Request, res: Response) => {
  try {
    const { asset, currency }: GetHistoryDataParams = req.body;
    const { data } = await getHourlyHistoryDataForOneDay({ asset, currency });

    console.log(data);

    return res.status(200).json({ data });
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
