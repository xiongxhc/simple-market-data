import axios from "axios";
import { env } from "../const/env";
import { HOURS_IN_DAY } from "../const/time";
import { url } from "../const/url";

export const getHourlyHistoryDataForOneDay = async (asset, currency) => {
  return await axios({
    method: "GET",
    url: `${url.CRYPTO_COMPARE_BASE_URL}/data/v2/histohour?fsym=${asset}&tsym=${currency}&limit=${HOURS_IN_DAY}`,
    headers: {
      authorization: `${env.CRYPTO_COMPARE_API_KEY}`,
    },
  });
};
