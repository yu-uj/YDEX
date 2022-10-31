const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");

const {
  PairPoolTotalStatked,
  singlePoolTotalStaked,
} = require("../coinDemon/Controller");

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(morgan("dev"));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("MongoDB is connected ... ");
});

setInterval(() => {
  singlePoolTotalStaked();
  // PairPoolTotalStatked();
}, 1000);

app.listen(port, () => {
  console.log(`Coindemon is running on ${port}...`);
});
