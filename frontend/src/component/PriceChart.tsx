import * as React from "react";
import axios from "axios";
import { Tabs, Tab } from "@mui/material";
import { Chart, LineAdvance } from "bizcharts";
import { SpinnerCircular } from "spinners-react";

import { url } from "../const/url";
import { assetNames, currencyNames } from "../const/assets";

export const PriceChart = () => {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(assetNames.BTC);

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`/market-history?asset=${tabValue}&currency=${currencyNames.USD}`, {
        baseURL: url.BASE_URL,
      })
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setData(err.response.data.errors);
        setLoading(false);
      });
  }, [tabValue]);

  const handleChange = (
    event: React.SyntheticEvent,
    newTab: React.SetStateAction<assetNames>
  ) => {
    setTabValue(newTab);
  };

  return (
    <>
      <Tabs value={tabValue} onChange={handleChange}>
        <Tab value={assetNames.BTC} label={assetNames.BTC} />
        <Tab value={assetNames.ETH} label={assetNames.ETH} />
      </Tabs>
      <Chart padding={[20, 40, 100, 80]} autoFit height={700} data={data}>
        {loading ? (
          <SpinnerCircular color="white" style={{ margin: 200 }} />
        ) : (
          <LineAdvance shape="smooth" point area position="time*price" />
        )}
      </Chart>
    </>
  );
};
