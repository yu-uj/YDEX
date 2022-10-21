const mongoose = require("mongoose");

const tokensSchema = new mongoose.Schema({
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
tokensSchema.methods.saveToken = async function() {
    return await this.save();
}

// 모든 token 조회
tokensSchema.statics.getToken = async function() {
    return await this.find({});
}

module.exports = mongoose.model("tokens", tokensSchema);