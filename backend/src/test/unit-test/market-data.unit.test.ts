import { expect } from "chai";
import { assetNames } from "../../const/assets";
import { currencyNames } from "../../const/currencies";
import { getMarketData } from "../../controller/marketData";

describe("Test market data functions", () => {
  it("Can get market data", async () => {
    const data = await getMarketData(`${assetNames.BTC},${assetNames.ETH}`,currencyNames.USD,);
    expect(data.status).to.deep.equal(200);
  });

  it("Can get error if assets are invalid", async () => {
    const data = await getMarketData("???",currencyNames.USD);
    expect(data.data).to.deep.equal({
      Response: "Error",
      Message:
        "cccagg_or_exchange market does not exist for this coin pair (???-USD)",
      HasWarning: false,
      Type: 1,
      RateLimit: {},
      Data: {},
      Cooldown: 0,
    });
  });

  it("Can get error if currencies are invalid", async () => {
    const data = await getMarketData(`${assetNames.BTC},${assetNames.ETH}`,"???",);
    expect(data.data).to.deep.equal({
      Response: "Error",
      Message:
        "cccagg_or_exchange market does not exist for this coin pair (BTC-???), cccagg_or_exchange market does not exist for this coin pair (ETH-???)",
      HasWarning: false,
      Type: 1,
      RateLimit: {},
      Data: {},
      Cooldown: 0,
    });
  });

  it("Can get error if assets are empty", async () => {
    const data = await getMarketData(null, currencyNames.USD);
    expect(data.data).to.deep.equal({
      Response: "Error",
      Message: "cccagg_or_exchange market does not exist for this coin pair (NULL-USD)",
      HasWarning: false,
      Type: 1,
      RateLimit: {},
      Data: {},
      Cooldown: 0
    });
  });
});
