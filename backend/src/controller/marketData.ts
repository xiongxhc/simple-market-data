import axios from "axios";
import { assetNames, currencyNames } from "../const/assets";
import { env } from "../const/env";
import { url } from "../const/url";
import { UnableToGetDataError } from "../utils/error";

interface GetMarketDataParams {
  assets: assetNames[];
  currencies: currencyNames[];
}

export const getMarketData = async ({assets, currencies}: GetMarketDataParams) => {
  const assetsString = assets.join(",");
  const currenciesString = currencies.join(",");
  return await axios({
    method: "GET",
    url: `${url.CRYPTO_COMPARE_BASE_URL}/data/pricemultifull?fsyms=${assetsString}&tsyms=${currenciesString}`,
    headers: {
      authorization: `${env.CRYPTO_COMPARE_API_KEY}`
    }
  })
}