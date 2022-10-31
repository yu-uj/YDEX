const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema({
  token_address: {
    type: String,
    required: true,
  },
  token_name: {
    type: String,
    required: true,
  },
  token_symbol: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("tokens", TokenSchema)
