import mongoose from "mongoose";

const PhotoSchema = mongoose.Schema(
  {
    title: String,
    family: String,
    path: String,
    tags: Array,
    album: String,
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

export const PhotoModel = mongoose.model("Album", PhotoSchema);
