import axios from "axios";
import { GetMarketDataParams } from "../api/api-market-data";
import { env } from "../const/env";
import { url } from "../const/url";

export const getMarketData = async ({
  assets,
  currencies,
}: GetMarketDataParams) => {
  const assetsString = assets.join(",");
  const currenciesString = currencies.join(",");
  return await axios({
    method: "GET",
    url: `${url.CRYPTO_COMPARE_BASE_URL}/data/pricemulti?fsyms=${assetsString}&tsyms=${currenciesString}`,
    headers: {
      authorization: `${env.CRYPTO_COMPARE_API_KEY}`,
    },
  });
};
