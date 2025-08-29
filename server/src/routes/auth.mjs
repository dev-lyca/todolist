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
  passport.authenticate("google"),
  (request, response) => {
    response.redirect("http://localhost:3000/userpage/dashboard");
  }
);

// checking if user is logged in and returning user info
router.get("/api/auth/user", (request, response) => {
  if (request.isAuthenticated()) {
    response.json(request.user);
  } else {
    response.redirect("http://localhost:3000/login");
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

      res.clearCookie("session_secret");
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

export default router;
