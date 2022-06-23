import axios from "axios";
import { expect } from "chai";
import { assetNames, currencyNames } from "../../../const/assets";

describe("Test GET /api/market-data", () => {
  const url = "http://localhost:3080/api/market-data";
  it("can get market data", async () => {
    const data = {
      assets: [assetNames.BTC, assetNames.ETH],
      currencies: [currencyNames.USD],
    };
    const response = await axios({
      url,
      method: "GET",
      data,
    })
    expect(response.status).to.deep.equal(200);
  });

  it("can throw 422 error if assets not in assetNames", async () => {
    const data = {
      assets: ["???", assetNames.ETH],
      currencies: [currencyNames.USD],
    };
    const response = await axios({
      url,
      method: "GET",
      data,
    }).catch((err)=> {
      expect(err.response.data).to.deep.equal({
        errors: [
          {
            value: ["???", assetNames.ETH],
            msg: 'Invalid assets',
            param: 'assets',
            location: 'body'
          }
        ]
      });
    })
  });

  it("can throw 422 error if currency not in currencyNames", async () => {
    const data = {
      assets: [assetNames.BTC, assetNames.ETH],
      currencies: ["???"],
    };
    const response = await axios({
      url,
      method: "GET",
      data,
    }).catch((err)=> {
      expect(err.response.data).to.deep.equal({
        errors: [
          {
            value: ["???"],
            msg: 'Invalid currencies',
            param: 'currencies',
            location: 'body'
          }
        ]
      });
    })
  });
});