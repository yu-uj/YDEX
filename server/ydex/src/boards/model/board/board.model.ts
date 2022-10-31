import * as mongoose from 'mongoose';

export const BoardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export interface Board {
  id: string;
  title: string;
  description: string;
  price: number;
}
