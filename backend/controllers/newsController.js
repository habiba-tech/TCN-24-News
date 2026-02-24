const News = require("../models/News");

exports.createNews = async (req, res) => {
  const news = await News.create({
    ...req.body,
    author: req.user._id,
    publishedAt: new Date()
  });
  res.json(news);
};

exports.getAllNews = async (req, res) => {
  const news = await News.find({ isPublished: true })
    .populate("category")
    .sort({ createdAt: -1 });

  res.json(news);
};

exports.getBreakingNews = async (req, res) => {
  const news = await News.find({ isBreaking: true });
  res.json(news);
};

exports.searchNews = async (req, res) => {
  const keyword = req.query.keyword;
  const news = await News.find({
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } }
    ]
  });
  res.json(news);
};

exports.deleteNews = async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};