const mongoose = require("mongoose");

const stakedtokenSchema = new mongoose.Schema({
    token_address: {
        type: String,
        required: true,
        unique: true,
    },
    token_name: {
        type: String,
        required: true,
    },
    token_symbol: {
        type: String,
        required: true,
    }
});

// token 정보 저장
stakedtokenSchema.methods.savestakedToken = async function() {
    return await this.save();
}

stakedtokenSchema.statics.getstakedToken = async function() {
    return await this.find({});
}

module.exports = mongoose.model("Stakedtoken", stakedtokenSchema);