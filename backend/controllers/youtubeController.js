const axios = require("axios");
const News = require("../models/News");

exports.fetchYouTubeNews = async (req, res) => {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&channelId=${process.env.CHANNEL_ID}&part=snippet,id&order=date&maxResults=5`;

  const response = await axios.get(url);

  const videos = response.data.items.map((item) => ({
    etag: item.etag,
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    publishedAt: item.snippet.publishedAt,
    thumbnail: item.snippet.thumbnails,
    videoUrl: `${process.env.YOUTUBE_VIDEO_BASE_URL}${item.id.videoId}`,
  }));
  console.log(videos);

  res.json({success: true, message: "YouTube news updated", data: videos});
};