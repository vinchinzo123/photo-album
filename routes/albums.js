import express from "express";
import { AlbumModel } from "../photoAlbumModel";
import { UserModel } from "../usersModel"

const router = express.Router();

router.get("/:id", async (req, res) => {
  const userId = req.params.id
  const albums = await AlbumModel.find({ userId }, (err, res) => {
    if (err) return console.error(err)
  })
  res.send(albums)

})

router.get("/search/:id/:term", async (req, res) => {
  const { id, term } = req.params
  let termRegex = new RegExp(term, 'gi')
  const albums = await AlbumModel.find({ userId: id, albumName: termRegex }, (err, res) => {
    if (err) return console.error(err)
  })
  console.log('albums', albums)
  res.send(albums)
})

router.post("/", async (req, res) => {
  const { albumName, familyName, userId } = req.body
  const albumObj = { albumName, familyName, userId };
  const album = await AlbumModel(albumObj);
  album.save((err, album) => {
    if (err) return console.error(err);
    console.log(album)
    res.send(album);
  });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id
  await AlbumModel.deleteOne({ _id: id }, err => {
    if (err) return console.error(err);
    res.send(`Removed album ${id}`)
  })
})

router.delete("/delete-all", async (req, res) => {
  AlbumModel.remove({}, (err, res) => {
    if (err) return console.error(err);
  });
  res.send("albums deleted");
});

module.exports = router;
