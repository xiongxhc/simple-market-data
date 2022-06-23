import axios from "axios";
import { Request, Response } from "express";
import { APIError } from "../utils/error";
import { unhandledException } from "../utils/unhandledException";

const getHistoricData = async (req: Request, res: Response) => {
  try {
    // TODO: implememt get historic data
    return res.status(200).json({ message: "Not implemented" });
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
