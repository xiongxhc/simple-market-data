import { expect } from "chai";
import { sequalizeMarketHistoryData } from "../../api/api-market-history";
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

describe("Test sequalizeHistoryData", () => {
  it("Can return correct format after sequalize", async () => {
    const data = [
      {
        close: 20265.08,
        conversionSymbol: "",
        conversionType: "direct",
        high: 20361.36,
        low: 20206.39,
        open: 20334.89,
        time: 1656000000,
        volumefrom: 1553.43,
        volumeto: 31517300.47,
      },
      {
        close: 20301.51,
        conversionSymbol: "",
        conversionType: "direct",
        high: 20364.29,
        low: 20159.79,
        open: 20265.08,
        time: 1656003600,
        volumefrom: 1199.5,
        volumeto: 24316380.79,
      },
    ];
    const sequalizeData = await sequalizeMarketHistoryData(data);
    expect(sequalizeData).to.deep.equal([
      {
        time: "24/06/2022, 00:00:00",
        price: 20334.89,
      },
      {
        time: "24/06/2022, 01:00:00",
        price: 20265.08,
      },
    ]);
  });
});
