import { Router } from "express";
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
    req.session.user = {
      _id: req.user._id,
      googleId: req.user.googleId,
      displayName: req.user.displayName,
      email: req.user.email,
      photo: req.user.photo,
      createdAt: req.user.createdAt,
      updatedAt: req.user.updatedAt,
    };

    req.session.save((err) => {
      if (err) console.error("Session save error:", err);

      res.redirect(`${process.env.NEXTJS_URL}`);
    });
  }
);

// checking if user is logged in and returning user info
router.get("/api/auth/user", (req, res) => {
  console.log("Session:", req.session);
  console.log("User:", req.user);

  if (req.isAuthenticated()) {
    return res.json(req.user);
  } else {
    return res.status(401).json({ error: "User not logged in" });
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
