import express from "express";
import cors from "cors";
import userRouter from "./routes/user";
import AuctionRouter from "./routes/auction";
import AdminRouter from "./routes/admin";
import indexRouter from "./routes/index";
import ServerStart from "./helper/startServer";
// create server instance with express
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
// routes
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/auction", AuctionRouter);
app.use("/admin", AdminRouter);

// starting the server
ServerStart(app);
