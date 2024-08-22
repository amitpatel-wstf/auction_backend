export type auctionType = {
  itemName: string;
  startTime: number;
  endTime: number;
  startPrice: number;
};

export type bidType = {
  artName: string;
  description: string;
  currentBid: number;
  artist: string;
  id: string;
};
