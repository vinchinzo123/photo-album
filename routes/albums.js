import express from "express";
import { AlbumModel } from "../photoAlbumModel";

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("albums");
  const albums = await AlbumModel.find((err, res) => {
    if (err) return console.error(err);
  });
  res.send(albums);
});

router.post("/", async (req, res) => {
  console.log("test");
  console.log(req.body);
  const albumObj = { albumName: req.body.albumName, familyName: "test_family" };
  const album = new AlbumModel(albumObj);
  album.save((err, album) => {
    if (err) return console.error(err);
    res.send(album);
  });
});

router.delete("/delete-all", async (req, res) => {
  AlbumModel.remove({}, (err, res) => {
    if (err) return console.error(err);
  });
  res.send("albums deleted");
});

module.exports = router;
