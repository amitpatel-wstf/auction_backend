// src/models/Auction.ts
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IAuction extends Document {
  itemName: string;
  startTime: Date;
  endTime: Date;
  startPrice: number;
  currentPrice: number;
  winnerUserId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AuctionSchema: Schema<IAuction> = new Schema(
  {
    itemName: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    startPrice: { type: Number, required: true },
    currentPrice: { type: Number, required: true },
    winnerUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Auction: Model<IAuction> = mongoose.model<IAuction>('Auction', AuctionSchema);
export default Auction;
