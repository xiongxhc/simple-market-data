import * as React from "react";
import axios from "axios";
import { styled } from "@mui/system";

import { url } from "../const/url";
import { assetNames, currencyNames } from "../const/assets";

const query = {
  assets: [assetNames.BTC, assetNames.ETH],
  currencies: currencyNames.USD,
};

const Container = styled('div')({
  color: "darkslategray",
  backgroundColor: "aliceblue",
  padding: 8,
  borderRadius: 4,
  margin: "20px"
});


export const MarketPrice = () => {
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    axios
      .get(`/market-data?assets=${query.assets}&currencies=${query.currencies}`, {
        baseURL: url.BASE_URL,
      })
      .then((res) => {
        setData(res.data.data);
      });
  }, []);

  return (
    <Container>
      {JSON.stringify(data)}
    </Container>
  );
};