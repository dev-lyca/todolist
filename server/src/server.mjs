import dotenv from "dotenv";
dotenv.config();

import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
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
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(cookieParser(process.env.COOKIE_SECRET || "cookie_secret"));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "session_secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.get("/api/home", (req, res) => {
  res.json({ msg: "Hello world" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
