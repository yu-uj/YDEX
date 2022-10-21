const mongoose = require("mongoose");

const kip7pairSchema = new mongoose.Schema({
    pair_address: {
        type: String,
        required: true,
        unique: true,
    },
    pair_name: {
        type: String,
        required: true,
    },
    tokenA_address: {
        type: String,
        required: true,
    },
    tokenB_address: {
        type: String,
        required: true,
    },
    pid: {
        type: Number,
        required: true,
    }
});

// kip7 pair 정보저장
kip7pairSchema.methods.saveKIP7pair = async function() {
    return await this.save();
}

// kip7 pair 목록 
kip7pairSchema.statics.getKIP7pair = async function() {
    return await this.find({});
}

module.exports = mongoose.model("kip7pair", kip7pairSchema);