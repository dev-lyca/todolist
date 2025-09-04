import dotenv from "dotenv";
dotenv.config();

import MongoStore from "connect-mongo";
import cors from "cors";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import routes from "./routes/index.mjs";
import "./strategies/google-strategy.mjs";

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to DB"))
  .catch((err) => console.error("DB Connection Error:", err));

app.use(express.json());

app.use(
  cors({ origin: "https://tracktask-nggt.onrender.com", credentials: true })
);

app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "session_secret",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.get("/", (req, res) => {
  res.send("TrackTask backend is running ✅");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
