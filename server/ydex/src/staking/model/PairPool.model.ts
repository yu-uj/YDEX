import mongoose from "mongoose";


export const PairPoolSchema = new mongoose.Schema({
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

export interface PairPool{
    pair_address:string,
    pair_name:string,
    tokenA_address:string,
    tokenB_address:string,
    pid:number,
    totalStatked:number,
    type:string
}