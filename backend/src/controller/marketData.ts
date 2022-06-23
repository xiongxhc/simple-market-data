import axios from "axios";
import { env } from "../const/env";
import { url } from "../const/url";

export const getMarketData = async (
  assets,
  currencies,
) => {
  return await axios({
    method: "GET",
    url: `${url.CRYPTO_COMPARE_BASE_URL}/data/pricemulti?fsyms=${assets}&tsyms=${currencies}`,
    headers: {
      authorization: `${env.CRYPTO_COMPARE_API_KEY}`,
    },
  });
};
