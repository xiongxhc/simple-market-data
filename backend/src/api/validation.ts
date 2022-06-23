import { Request, Response } from "express";
import { validationResult, body, ValidationChain } from "express-validator";
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
  body("assets")
    .isArray()
    .custom((assets) => {
      return assets.every((asset: string) => {
        return asset in assetNames;
      });
    })
    .withMessage("Invalid assets"),
  body("currencies")
    .isArray()
    .custom((currencies) => {
      return currencies.every((currency: string) => {
        return currency in currencyNames;
      });
    })
    .withMessage("Invalid currencies"),
]);

export const apiGetMarketHistoryValidation = validate([
  body("asset")
    .custom((asset) => {
      return asset in assetNames;
    })
    .withMessage("Invalid asset"),
  body("currency")
    .custom((currency) => {
      return currency in currencyNames;
    })
    .withMessage("Invalid currency"),
]);
