import mongoose from "mongoose";

const bidsSchema = new mongoose.Schema({
    artName:{type:String, required:true},
    description:{type:String, required:true},
    currentBid:{type:Number, required:true},
    artist:{type:String, required:true},
    userId:{type:String, required:true},
})

const Bids = mongoose.model('Bid', bidsSchema);
export default Bids;