import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

const router = Router();

// asking user to authenticate with google
router.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// handling the callback after google has authenticated the user

router.get(
  "/api/auth/google/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Build payload for JWT
    const payload = {
      _id: req.user._id,
      googleId: req.user.googleId,
      displayName: req.user.displayName,
      email: req.user.email,
      photo: req.user.photo,
    };

    // Sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d", // adjust as needed
    });

    // Send token as httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true, // cannot be accessed by JS
      secure: true, // required for HTTPS
      sameSite: "strict", // CSRF protection
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Redirect to frontend dashboard
    res.redirect("https://tracktask-nggt.onrender.com/userpage/dashboard");
  }
);

// checking if user is logged in and returning user info
router.get("/api/auth/user", (req, res) => {
  if (req.isAuthenticated() && req.user) {
    res.json(req.user); // return the logged-in user info
  } else {
    res.status(401).json({ error: "User not logged in" });
  }
});

// logging out the user, destroying session and clearing cookie
router.post("/api/auth/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);

  req.logout(function (err) {
    if (err) return res.status(500).json({ message: "Logout failed" });

    req.session.destroy((err) => {
      if (err)
        return res.status(500).json({ message: "Session destroy failed" });

      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

export default router;
