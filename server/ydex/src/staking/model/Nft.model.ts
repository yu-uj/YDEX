import mongoose from 'mongoose';

export const NftSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    tokenId: {
      type: Number,
      required: true,
      unique: true,
    },
    tokenURI: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export interface NftSchema {
  address: string;
  tokenId: number;
  tokenURI: string;
  price: number;
}
