import express from "express";
import cors from "cors";
import userRouter from "./routes/user";
import connectDB from "./config/db";
import AuctionRouter from "./routes/auction";

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use("/user", userRouter);
app.use("/auction", AuctionRouter);

app.get("/", async (req, res) => {
  try {
    res.status(200).json({ status: true, messeage: "Route working...!" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Error in Routes" });
  }
});

app.post("/admin", async (req, res) => {
  try {
    const { token } = req.body;
    const tokenFromEnv = process.env.ADMIN_TOKEN;
    console.log(tokenFromEnv)
    if (token !== tokenFromEnv) {
      return res
        .status(401)
        .json({
          status: false,
          message: "You have not authorized to access this route!",
        });
    }
    res.status(200).json({ message: "Loging Success...!", status: true });
  } catch (error) {}
});
app.listen(3001, async () => {
  console.log("Server started on port 3001");
  await connectDB();
});
