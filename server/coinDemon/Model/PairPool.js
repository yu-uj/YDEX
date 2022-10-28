const mongoose = require('mongoose')


const PairPoolSchema = new mongoose.Schema({
    pair_address:{
        type:String,
        required : true,
        unique:true,
    },
    pair_name:{
        type:String,
        required:true,
    },
    tokenA_address:{
        type:String,
        required:true,
    },
    tokenB_address:{
        type:String,
        required:true,
    },
    pid:{
        type:Number,
        required:true,
    },
    totalStaked:{
        type:Number,
        default:0,        
    },
    type:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model("kip7pairs", PairPoolSchema)