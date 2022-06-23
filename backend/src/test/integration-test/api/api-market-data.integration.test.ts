import axios from "axios";
import { expect } from "chai";
import { assetNames, currencyNames } from "../../../const/assets";

describe("Test GET /api/market-data", () => {
  const url = "http://localhost:3080/api/market-data";
  it("can get market data", async () => {
    const query = {
      assets: [assetNames.BTC, assetNames.ETH],
      currencies: [currencyNames.USD],
    };
    const response = await axios.get(`${url}?assets=${query.assets}&currencies=${query.currencies}`);
    expect(response.status).to.deep.equal(200);
  });

  it("can throw 422 error if assets not in assetNames", async () => {
    const query = {
      assets: ["USDT", assetNames.ETH],
      currencies: [currencyNames.USD],
    };
    await axios.get(`${url}?assets=${query.assets}&currencies=${query.currencies}`).catch((err) => {
      expect(err.response.data).to.deep.equal({
        errors: [
          {
            value: "USDT,ETH",
            msg: "Invalid assets",
            param: "assets",
            location: "query",
          },
        ],
      });
    });
  });

  it("can throw 422 error if currency not in currencyNames", async () => {
    const query = {
      assets: [assetNames.BTC, assetNames.ETH],
      currencies: ["AUD"],
    };
    await axios.get(`${url}?assets=${query.assets}&currencies=${query.currencies}`).catch((err) => {
      expect(err.response.data).to.deep.equal({
        errors: [
          {
            value: "AUD",
            msg: "Invalid currencies",
            param: "currencies",
            location: "query",
          },
        ],
      });
    });
  });
});
