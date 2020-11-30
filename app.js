import dontenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";

const albums = require("./routes/albums");
const photos = require("./routes/photos");
const auth = require("./routes/auth");
const users = require("./routes/users");

dontenv.config();

mongoose
  .connect("mongodb://localhost", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Mongo connected to family photos`))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to family photo API");
});

app.use("/albums", albums);
app.use("/photos", photos);
app.use("/auth", auth);
app.use("/users", users);

app.listen(PORT, () => {
  console.log(`Listening at port http://localhost:${PORT}`);
});
