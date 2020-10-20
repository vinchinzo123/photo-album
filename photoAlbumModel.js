import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema(
  {
    String: String,
  },
  {
    timestamps: true,
  }
);

export const AlbumModel = mongoose.model("Photo", AlbumSchema);
