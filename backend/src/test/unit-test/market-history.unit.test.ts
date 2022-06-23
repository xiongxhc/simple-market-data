import { expect } from "chai";
import { assetNames } from "../../const/assets";
import { currencyNames } from "../../const/currencies";
import { getHourlyHistoryDataForOneDay } from "../../controller/historyData";

describe("Test history data functions", () => {
  it("Can get 24 hours history data", async () => {
    const data = await getHourlyHistoryDataForOneDay(
      assetNames.BTC,
      currencyNames.USD
    );
    expect(data.status).to.deep.equal(200);
  });

  it("Can get error if asset are invalid", async () => {
    const data = await getHourlyHistoryDataForOneDay(
      "???" as any,
      currencyNames.USD
    );
    expect(data.data).to.deep.equal({
      Response: "Error",
      Message: "CCCAGG market does not exist for this coin pair (???-USD)",
      HasWarning: false,
      Type: 1,
      RateLimit: {},
      Data: {},
      Cooldown: 0,
    });
  });

  it("Can get error if currency are invalid", async () => {
    const data = await getHourlyHistoryDataForOneDay(
      assetNames.BTC,
      "???" as any
    );
    expect(data.data).to.deep.equal({
      Response: "Error",
      Message: "CCCAGG market does not exist for this coin pair (BTC-???)",
      HasWarning: false,
      Type: 1,
      RateLimit: {},
      Data: {},
      Cooldown: 0,
    });
  });

  it("Can get error if asset is empty", async () => {
    const data = await getHourlyHistoryDataForOneDay(
      [currencyNames.USD],
      undefined
    );
    expect(data.data).to.deep.equal({
      Response: "Error",
      Message:
        "CCCAGG market does not exist for this coin pair (USD-UNDEFINED)",
      HasWarning: false,
      Type: 1,
      RateLimit: {},
      Data: {},
      Cooldown: 0,
    });
  });
});
