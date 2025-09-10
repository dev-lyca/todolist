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
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://tracktask-nggt.onrender.com",
      "https://tracktask-five.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
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
      maxAge: 1000 * 60 * 60 * 3,
      httpOnly: true,
      secure: true,
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

app.get("/api/auth/session", (req, res) => {
  console.log("Cookies:", req.cookies);
  console.log("Session:", req.session);
  console.log("User:", req.user);
  if (req.session?.user) {
    return res.status(200).json({ user: req.session.user });
  }
  res.status(401).json({ error: "Not authenticated" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
