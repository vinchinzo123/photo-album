import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const albums = require("./routes/albums");
const photos = require("./routes/photos");

mongoose
  .connect("mongodb://localhost", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Mongo connected to family photos`))
  .catch((err) => console.error(err));

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to family photo API");
});

app.use("/albums", albums);
app.use("/photos", photos);

app.listen(PORT, () => {
  console.log(`Listening at port http://localhost:${PORT}`);
});
