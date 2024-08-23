import Auction from "../models/Auction";
import Bids from "../models/bids";

export async function getAuctions() {
  try {
    const auctions = await Auction.find();
    return auctions;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function createAuction(
  itemName: string,
  startTime: number,
  endTime: number,
  startPrice: number
) {
  try {
    const newAuction = await Auction.create({
      itemName: itemName,
      startTime: startTime,
      endTime: endTime,
      startPrice: startPrice,
      currentPrice: startPrice,
    });
    return newAuction;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function createBid(
  artName: string,
  description: string,
  artist: string,
  id: string,
  currentBid: number
) {
  try {
    let bid = await Bids.findOne({ userId: id });
    if (!bid) {
      bid = await Bids.create({
        artName: artName,
        description: description,
        artist: artist,
        userId: id,
        currentBid: currentBid,
      });
    } else {
      bid = await Bids.findOneAndUpdate(
        { userId: id },
        {
          $inc: {
            currentBid: currentBid,
          },
        },
        { new: true }
      );
    }
    return bid;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getWinner() {
  try {
    const bids = await Bids.find();
    if (!bids || bids.length === 0) {
      return null;
    }
    const maxBid = bids.reduce((prev, current) =>
      current.currentBid > prev.currentBid ? current : prev
    );
    return maxBid;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getBidByUserId(userId: string) {
  try {
    const bid = await Bids.find({ userId: userId });
    return bid;
  } catch (error: any) {
    throw new Error(error);
  }
}
