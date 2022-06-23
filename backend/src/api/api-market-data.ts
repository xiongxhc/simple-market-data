import { Request, Response } from "express";
import { assetNames, currencyNames } from "../const/assets";
import { getMarketData } from "../controller/marketData";
import { APIError } from "../utils/error";
import { unhandledException } from "../utils/unhandledException";

const marketData = async (req: Request, res: Response) => {
  try {
    const { assets, currencies } = req.query;
    const { data } = await getMarketData(assets, currencies);

    if (data.Response === "Error") {
      throw new APIError(
        `Unable to get data for asset: ${assets} in currency: ${currencies}`
      );
    }

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
  get: marketData,
};
