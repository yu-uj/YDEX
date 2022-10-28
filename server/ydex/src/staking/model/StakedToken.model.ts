import mongoose from 'mongoose';

export const StakedTokenSchema = new mongoose.Schema({
  token_address: {
    type: String,
    required: true,
    unique : true,
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
    required:false,
    default:0
}
});

export interface StakedToken {
  token_address: string;
  token_name: string;
  token_symbol: string;
  totalStaked:number;
}
