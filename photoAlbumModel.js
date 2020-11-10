import mongoose from "mongoose";

const AlbumSchema = mongoose.Schema(
  {
    albumName: String,
    familyName: String,
  },
  {
    timestamps: true,
  }
);

export const AlbumModel = mongoose.model("Photo", AlbumSchema);
