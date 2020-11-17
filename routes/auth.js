import express, { response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../usersModel";
import { generateToken, getCleanUser } from "../utils";

const router = express.Router();

router.use((req, res, next) => {
  let token = req.headers["authorization"];
  console.log(token);
  if (!token) return next();
  if (token.replace("Bearer " === "null")) return next();

  token = token.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user.",
      });
    } else {
      req.user = user;
      next();
    }
  });
});

router.get("/", (req, res) => {
  if (!req.user)
    return res
      .status(401)
      .json({ success: false, message: "Invalid user to access it." });
  res.send("Welcome - " + req.user.username);
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const pwd = req.body.password;

  if (!email || !pwd) {
    return res.status(401).json({
      error: true,
      message: "Email and Password is required",
    });
  }
  const userData = await UserModel.findOne({ email }, (err, res) => {
    if (err) return console.error(err);
  });
  if (!userData) {
    return res.status(401).json({
      error: true,
      message: "Email or Password is wrong",
    });
  }
  userData.comparePassword(pwd, (err, isMatch) => {
    if (err) return err;
    if (email !== userData.email || !isMatch) {
      return res.status(401).json({
        error: true,
        message: "Email or Password is wrong",
      });
    }
    const token = generateToken(userData);
    const userObj = getCleanUser(userData);
    return res.json({ user: userObj, token });
  });
});

router.get("/logout", (req, res) => {
  console.log("LOGGED OUT");
  return res.json({
    message: "Logout successful",
  });
});

router.get("/verifyToken/:token", async (req, res) => {
  let token = req.params.token;
  let _id = req.body._id;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required",
    });
  }
  const userData = await UserModel.findById(_id, (err, res) => {
    if (err) return console.error(err);
  });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(401).json({
        error: true,
        message: "Invalid token.",
      });

    if (user._id != userData._id) {
      return res.status(401).json({
        error: true,
        message: "Invalid user.",
      });
    }
    let userObj = getCleanUser(userData);
    return res.json({ user: userObj, token });
  });
});
module.exports = router;
