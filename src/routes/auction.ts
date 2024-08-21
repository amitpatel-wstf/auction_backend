import express, { NextFunction } from "express";
import Auction from "../models/Auction";
import jwt from "jsonwebtoken";
import Bids from "../models/bids";

const app = express.Router();

async function tokenExtractor(req: any, res: any, next: any) {
  try {
    const { token }: { token: string } = req.body;
    const response: string | jwt.JwtPayload = jwt.verify(
      token,
      process.env.SECRET_KEY || ""
    );
    const decoded = jwt.decode(token);
    // @ts-ignore
    req.body.id = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Invalid token" });
  }
}

// Get all auctions
app.get("/", async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Create an auction
app.post("/", async (req, res) => {
  try {
    const { itemName, startTime, endTime, startPrice } = req.body;
    const newAuction = new Auction({
      itemName,
      startTime,
      endTime,
      startPrice,
      currentPrice: startPrice,
    });
    const auction = await newAuction.save();
    res.status(201).json(auction);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});



app.post("/placebid", tokenExtractor, async (req, res) => {
  try {
    const {
      artName,
      description,
      currentBid,
      artist,
      id,
    }: {
      artName: string;
      description: string;
      currentBid: number;
      artist: string;
      id: string;
    } = req.body;
    const bid = await Bids.create({
      artName: artName,
      description: description,
      artist: artist,
      userId: id,
      currentBid: currentBid,
    });

    res
      .status(200)
      .json({ message: "Bid placed successfully...!", status: true, bid: bid });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Error while placing bid...!" });
  }
});

app.get("/bids/:id",async(req,res)=>{
  try {
    const token = req.params.id;
    // @ts-ignore
    const decoded : string | jwt.JwtPayload  = jwt.decode(token)
    // @ts-ignore
    const userId = decoded.id;
    const bids = await Bids.find({ userId: userId });
    res.json({ bids: bids, status: true, message: "Bid List" });
  } catch (error) {
    res.status(500).json({status:false,message:"Error while getting the bids...!"})
  }
})

// global error catch
app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status || 500);
  res.json({ message: err.message, error: err });
});

export default app;
