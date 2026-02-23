const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
{
  title: String,
  description: String,
  image: String,
  videoUrl: String,
  videoId: { type: String, unique: true, sparse: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  isBreaking: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
  source: { type: String, default: "manual" },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  publishedAt: Date
},
{ timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);