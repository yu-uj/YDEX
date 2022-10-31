const mongoose = require('mongoose')

const StakedTokenSchema = new mongoose.Schema({
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
  totalStaked:{
    type:Number,
    required:false
}
});

module.exports = mongoose.model("stakedtokens", StakedTokenSchema)