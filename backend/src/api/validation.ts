import { Request, Response } from "express";
import { validationResult, query, ValidationChain } from "express-validator";
import { assetNames, currencyNames } from "../const/assets";

const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: () => any) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(422).json({
      errors: errors.array(),
    });
  };
};

export const apiGetMarketDataValidation = validate([
  query("assets")
  .custom((assets) => {
    const assetArray = assets.split(",");
    return assetArray.every((asset: string) => {
      return asset in assetNames;
    });
  })
  .withMessage("Invalid assets"),
  query("currencies")
  .custom((currencies) => {
    const currencyArray = currencies.split(",");
    return currencyArray.every((currency: string) => {
      return currency in currencyNames;
    });
  })
  .withMessage("Invalid currencies"),
]);

export const apiGetMarketHistoryValidation = validate([
  query("asset")
  .custom((asset) => {
    return asset in assetNames;
  })
  .withMessage("Invalid asset"),
  query("currency")
  .custom((currency) => {
    return currency in currencyNames;
  })
  .withMessage("Invalid currency"),
]);
