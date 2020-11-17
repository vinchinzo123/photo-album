import express from "express";
import { UserModel } from "../usersModel";
const router = express.Router();

router.get("/all", async (req, res) => {
  const users = await UserModel.find((err, res) => {
    if (err) return console.error(err);
  });
  res.send(users);
});
router.get("/:id", async (req, res) => {
  console.log("hi");
  if (!req.params.id) {
    return res.status(401).json({
      error: true,
      message: "No userID given",
    });
  }
  const { id } = req.params;
  const user = await UserModel.findById(id, (err, res) => {
    if (err) return console.error(err);
  });

  res.send(user);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  if (
    !req.body.username ||
    !req.body.familyname ||
    !req.body.email ||
    !req.body.password
  ) {
    return res.status(401).json({
      error: true,
      message: "Please supply a username familyname email and password",
    });
  }
  const { username, familyname, email, password } = req.body;
  const duplicateUser = await UserModel.findOne({ email }, (err, res) => {
    if (err) return console.error(err);
  });
  if (duplicateUser) {
    return res.status(401).json({
      error: true,
      message: "Email is currently in use.",
    });
  }
  const userObj = {
    username,
    familyname,
    email,
    password,
  };
  const user = new UserModel(userObj);
  user.save((err, user) => {
    if (err) return console.error(err);
    res.send(user);
  });
});

module.exports = router;
