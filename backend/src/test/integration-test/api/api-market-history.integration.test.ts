import axios from "axios";
import { expect } from "chai";
import { assetNames, currencyNames } from "../../../const/assets";

describe("Test GET /api/market-history", () => {
  const url = "http://localhost:3080/api/market-history";
  it("can get 24 hour market history", async () => {
    const data = {
      asset: assetNames.BTC,
      currency: currencyNames.USD,
    };
    const response = await axios({
      url,
      method: "GET",
      data,
    });
    expect(response.status).to.deep.equal(200);
    expect(response.data.data.Data.Data.length).to.deep.equal(25);
  });

  it("can throw 422 error if assets not in assetNames", async () => {
    const data = {
      asset: "USDT",
      currency: currencyNames.USD,
    };
    const response = await axios({
      url,
      method: "GET",
      data,
    }).catch((err) => {
      expect(err.response.data).to.deep.equal({
        errors: [
          {
            value: "USDT",
            msg: "Invalid asset",
            param: "asset",
            location: "body",
          },
        ],
      });
    });
  });

  it("can throw 422 error if currency not in currencyNames", async () => {
    const data = {
      asset: assetNames.BTC,
      currency: "AUD",
    };
    const response = await axios({
      url,
      method: "GET",
      data,
    }).catch((err) => {
      expect(err.response.data).to.deep.equal({
        errors: [
          {
            value: "AUD",
            msg: "Invalid currency",
            param: "currency",
            location: "body",
          },
        ],
      });
    });
  });
});
