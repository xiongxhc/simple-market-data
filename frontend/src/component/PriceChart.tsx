import * as React from "react";
import axios from "axios";
import { url } from "../const/url";
import { assetNames, currencyNames } from "../const/assets";
import { Chart, LineAdvance } from "bizcharts";

const query = {
  asset: assetNames.BTC,
  currency: currencyNames.USD,
};

export const PriceChart = () => {
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    axios
      .get(`/market-history?asset=${query.asset}&currency=${query.currency}`, {
        baseURL: url.BASE_URL,
      })
      .then((res) => {
        setData(res.data.data);
      });
  }, []);

  return (
    <Chart autoFit height={700} data={data}>
      <LineAdvance
        shape="smooth"
        point
        area
        position="time*open"
        color="city"
      />
    </Chart>
  );
};
