const ccxt = require("ccxt");

const exchangeId = "bitmart",
  exchangeClass = ccxt[exchangeId],
  exchange = new exchangeClass({
    apiKey: process.env.BIT_MART_ACCESS_KEY,
    secret: process.env.BIT_MART_SECRET_KEY,
  });
const priceArr = [];
if (exchange.has["fetchTickers"]) {
  exchange.fetchTickers().then((res) => {
    priceArr.push(Object.keys(res));
    console.log(priceArr);
  });
}
