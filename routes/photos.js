import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { PhotoModel } from "../photoModel";

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

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("get all photo");
  const photoList = await PhotoModel.find((err, res) => {
    if (err) return console.error(err);
  });
  res.send(photoList);
});

router.post("/", upload.single("image"), async (req, res) => {
  console.log(req.body);
  console.log("test");
  if (!req.file) {
    res.send("Supply a photo");
    return;
  }
  const parentDir = __dirname.slice(0, -7);
  let p = path.join(parentDir + "/uploads/" + req.file.filename);
  console.log(p);
  let data = fs.readFileSync(p);

  let photoObj = {
    title: req.body.title,
    family: req.body.family,
    tags: req.body.tags.split(","),
    album: req.body.album,
    path: p,
    img: {
      data,
      contentType: "image/png",
    },
  };

  const photo = new PhotoModel(photoObj);
  photo.save((err, photo) => {
    if (err) return console.error(err);
    res.send("photos uploaded");
  });

  //deletes the photo from the file system
});

router.get("/all", async (req, res) => {
  const all = await PhotoModel.find();
  console.log(all);
  res.send(all.map((a, i) => i));
});

router.delete("/all", async (req, res) => {
  const all = await PhotoModel.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    }
  });
  console.log(all);
  res.send("Deleted");
});
router.get("/:id", async (req, res) => {
  const photo = await PhotoModel.findById({ _id: req.params.id }, (err) => {
    if (err) return console.error(err);
  });
  if (photo === null) {
    res.send("Wrong ID");
    return;
  }
  res.contentType("json");
  res.send(photo);
  console.log(photo);
  console.log("ok");
});

router.put("/:id", async (res, req) => {
  const id = req.params.id;
  await PhotoModel.update({ _id: id }, req.body, (err, raw) => {
    if (err) return console.error(err);
    console.log(raw);
    res.send(`Photo with ${id} updated`);
  });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await PhotoModel.deleteOne({ _id: id }, (err) => {
    if (err) return console.error(err);
    console.log(`Removed photo ${id}`);
    res.send(`Removed photo ${id}`);
  });
});

router.get("/family/:family", async (req, res) => {
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

module.exports = router;
