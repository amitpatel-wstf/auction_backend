import express, { NextFunction } from "express";
import Auction from "../models/Auction";
import jwt from "jsonwebtoken";
import Bids from "../models/bids";
import { tokenExtractor } from "../middlewares/tokenExtractor";
import {
  createAuction,
  createBid,
  getAuctions,
  getBidByUserId,
  getWinner,
} from "../controllers/auction";
import { responseMessage } from "../types/responseMessage";
import { statusCode } from "../types/statusCode";
import { auctionType, bidType } from "../types/auction";
import { setUserId } from "../middlewares/setUserId";
import { tokenValidator } from "../middlewares/tokenValidator";

const app = express.Router();
//middaleware
app.use(tokenValidator);

// Get all auctions
app.get("/", async (req, res) => {
  try {
    const auctions = await getAuctions();
    res.status(statusCode.OK).json({
      auctions: auctions,
      status: true,
      message: responseMessage.getData,
    });
  } catch (error) {
    res
      .status(statusCode.InternalServerError)
      .json({ status: false, message: responseMessage.InternalServerError });
  }
});

// Create an auction
app.post("/", async (req, res) => {
  try {
    const { itemName, startTime, endTime, startPrice }: auctionType = req.body;
    const auction = await createAuction(
      itemName,
      startTime,
      endTime,
      startPrice
    );
    res.status(statusCode.Created).json({
      auction: auction,
      status: true,
      message: responseMessage.auctionCreated,
    });
  } catch (error) {
    res
      .status(statusCode.InternalServerError)
      .json({ status: false, message: responseMessage.InternalServerError });
  }
});

app.post("/placebid", tokenExtractor, async (req, res) => {
  try {
    const { artName, description, currentBid, artist, id }: bidType = req.body;
    const bid = await createBid(artName, description, artist, id, currentBid);

    res
      .status(statusCode.OK)
      .json({ message: responseMessage.bidPlaced, status: true, bid: bid });
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.InternalServerError)
      .json({ status: false, message: responseMessage.InternalServerError });
  }
});

app.get("/get-winner", async (req, res) => {
  try {
    const winner = await getWinner();
    if (!winner) {
      return res
        .status(statusCode.NotFound)
        .json({ status: false, message: responseMessage.UserNotFound });
    }
    res
      .status(statusCode.Accepted)
      .json({ status: true, message: responseMessage.winner, winner: winner });
  } catch (error) {
    res
      .status(statusCode.InternalServerError)
      .json({ status: false, message: responseMessage.InternalServerError });
  }
});

app.get("/bids/:id", setUserId, async (req, res) => {
  try {
    const userId = req.body.userId;
    const bid = await getBidByUserId(userId);
    res
      .status(statusCode.OK)
      .json({ bid: bid, status: true, message: responseMessage.getData });
  } catch (error) {
    res
      .status(statusCode.InternalServerError)
      .json({ status: false, message: responseMessage.InternalServerError });
  }
});

// global error catch
app.use((err: any, req: any, res: any, next: any) => {
  res.status(statusCode.InternalServerError);
  res.json({ message: responseMessage.InternalServerError, status: false });
});

export default app;
