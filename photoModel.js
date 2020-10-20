import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema(
  {
    title: String,
    family: String,
    path: String,
    tags: Array,
    photoAlbum: String,
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

export const PhotoModel = mongoose.model("Photo", PhotoSchema);
