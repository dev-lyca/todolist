import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GoogleUser } from "../mongoose/schemas/google-user.mjs";

//after verifying the user, passport will call this function
//to decide what to store in the session
passport.serializeUser((user, done) => {
  console.log("Inside serialize:");
  console.log(user);
  done(null, user.id);
});

//after storing the user in the session, passport will call this function
//on every request to retrieve the user details
passport.deserializeUser(async (id, done) => {
  console.log("Inside deserialize");
  console.log(`Deserializing ID: ${id}`);
  try {
    const findUser = await GoogleUser.findById(id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});


//once the callback is called, passport will call this function
//to find or create the user in our database
export default passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await GoogleUser.findOne({ googleId: profile.id });

        if (!user) {
          user = new GoogleUser({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails?.[0]?.value || null,
            photo: profile.photos?.[0]?.value || null,
          });
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        console.error("Error in Google strategy:", err);
        return done(err, null);
      }
    }
  )
);
