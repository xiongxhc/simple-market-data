import * as React from "react";
import axios from "axios";
import { styled } from "@mui/system";
import _map from "lodash/map";
import { SpinnerCircular } from "spinners-react";

import { url } from "../const/url";
import { assetNames, currencyNames } from "../const/assets";

const query = {
  assets: [assetNames.BTC, assetNames.ETH],
  currencies: [currencyNames.USD],
};

const Container = styled("div")({
  color: "darkslategray",
  backgroundColor: "aliceblue",
  padding: 8,
  borderRadius: 4,
  margin: "20px",
});

const labelGenerate = (data): React.ReactElement => {
  const displayData = _map(data, (currencyValue, key) => {
    const asset = `${[key]}: ${_map(currencyValue, (value, key) => {
      return `${value} ${key}`;
    })}`;
    return <Container>{asset}</Container>;
  });
  return <div>{displayData}</div>;
};

export const MarketPrice = () => {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(
        `/market-data?assets=${query.assets}&currencies=${query.currencies}`,
        {
          baseURL: url.BASE_URL,
        }
      )
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setData(err.response.data.errors);
        setLoading(false);
      });
  }, []);

  return (
    <>{loading ? <SpinnerCircular color="white" /> : labelGenerate(data)}</>
  );
};
