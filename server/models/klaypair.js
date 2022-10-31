const mongoose = require("mongoose");

const klaypairSchema = new mongoose.Schema({
    pair_address: {
        type: String,
        required: true,
        unique: true,
    },
    pair_name: {
        type: String,
        required: true,
    },
    token_address: {
        type: String,
        required: true,
    },
    pid: {
        type: Number,
        required: true,
    }
});

// klaypair 정보 저장
klaypairSchema.methods.saveKlaypair = async function() {
    return await this.save();
}

// klaypair 목록 조회
klaypairSchema.statics.getKlaypair = async function() {
    return await this.find({});
}

module.exports = mongoose.model("klaypair", klaypairSchema);