import mongoose from "mongoose";

const AlbumSchema = mongoose.Schema(
  {
    userId: String,
    albumName: String,
    familyName: String,
  },
  {
    timestamps: true,
  }
);

export const AlbumModel = mongoose.model("Photo", AlbumSchema);
