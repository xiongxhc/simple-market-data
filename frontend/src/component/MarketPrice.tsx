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

const PriceContainer = styled("div")({
  color: "darkslategray",
  backgroundColor: "aliceblue",
  padding: 8,
  borderRadius: 4,
  margin: "1em",
  width: "10em",
});

const Box = styled("div")({
  display: "flex",
  justifyContent: "space-between"
});

const labelGenerate = (data): React.ReactElement => {
  const displayData = _map(data, (currencyValue, key) => {
    const asset = (
        <Box>
          <div>{`${[key]}: `}</div>
          <div>{`${_map(currencyValue, (value, key) => {
            return `${value.toFixed(2)} ${key}`;
          })}`}
          </div>
        </Box>)
    return <PriceContainer>{asset}</PriceContainer>;
  });
  return <div>{displayData}</div>;
};

const fetchMarketData = async () => {
  return await axios.get(
    `/market-data?assets=${query.assets}&currencies=${query.currencies}`,
    {
      baseURL: url.BASE_URL,
    }
  );
};

export const MarketPrice = () => {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetchMarketData()
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setData(err.response.data.errors);
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      fetchMarketData()
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          setData(err.response.data.errors);
        });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>{loading ? <SpinnerCircular color="white" /> : labelGenerate(data)}</>
  );
};
