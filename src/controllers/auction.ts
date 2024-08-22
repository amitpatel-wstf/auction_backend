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

export async function createBid(artName: string,description: string,artist: string,id: string, currentBid: number) {
  try {
    const bid = await Bids.create({
        artName: artName,
        description: description,
        artist: artist,
        userId: id,
        currentBid: currentBid,
      })
      return bid;
  } catch (error: any) {
    throw new Error(error);
  }
}
