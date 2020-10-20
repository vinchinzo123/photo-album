import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import fs from "fs";
import path from "path";
import cors from "cors";
import { PhotoModel } from "./photoModel";

mongoose
  .connect("mongodb://localhost", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Mongo connected to family photos`))
  .catch((err) => console.error(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to family photo API");
});

app.get("/photos/family/:family", async (req, res) => {
  if (!req.params) {
    res.send("Must supply family name");
    return;
  }
  console.log(req.params);
  const photos = await PhotoModel.find({ family: req.params.family }, (err) => {
    if (err) return console.error(err);
  });
  res.contentType("json");
  res.send(
    photos.map((photo) => ({
      name: photo.name,
      title: photo.title,
      tags: photo.tags,
    }))
  );
  return;
});

app.get("/photos", async (req, res) => {
  const photoList = await PhotoModel.find((err, res) => {
    if (err) return console.error(err);
  });
  // res.json(
  //   photoList.map((photo) => ({
  //     name: photo.name,
  //     title: photo.title,
  //     tags: photo.tags,
  //     path: photo.path,
  //     id: photo._id,
  //   }))
  // );
  res.send(photoList);
});

app.get("/all", async (req, res) => {
  const all = await PhotoModel.find({});
  console.log(all);
  res.send(all.map((a, i) => i));
});

app.delete("/all", async (req, res) => {
  const all = await PhotoModel.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    }
  });
  console.log(all);
  res.send("Deleted");
});

app.get("/photos/:id", async (req, res) => {
  const photo = await PhotoModel.findById({ _id: req.params.id }, (err) => {
    if (err) return console.error(err);
  });
  if (photo === null) {
    res.send("No file supplied");
    return;
  }
  res.contentType("json");
  res.send(photo);
  console.log(photo);
  console.log("ok");
});

app.post("/photos", upload.single("image"), async (req, res) => {
  if (!req.file) {
    res.send("Supply a photo");
    return;
  }
  let p = path.join(__dirname + "/uploads/" + req.file.filename);
  let data = fs.readFileSync(p);

  let photoObj = {
    title: req.body.title,
    family: req.body.family,
    tags: req.body.tags.split(","),
    path: p,
    img: {
      data,
      contentType: "image/png",
    },
  };

  const photo = new PhotoModel(photoObj);
  photo.save((err, photo) => {
    if (err) return console.error(err);
    res.send(photo);
  });
});

app.put("/photos/:id", async (res, req) => {
  const id = req.params.id;
  await PhotoModel.update({ _id: id }, req.body, (err, raw) => {
    if (err) return console.error(err);
    console.log(raw);
    res.send(`Photo with ${id} updated`);
  });
});

app.delete("/photos/:id", async (req, res) => {
  const id = req.params.id;
  await PhotoModel.deleteOne({ _id: id }, (err) => {
    if (err) return console.error(err);
    console.log(`Removed photo ${id}`);
    res.send(`Removed photo ${id}`);
  });
});

app.listen(PORT, () => {
  console.log(`Listening at port http://localhost:${PORT}`);
});
