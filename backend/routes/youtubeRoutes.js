const router = require("express").Router();
const yt = require("../controllers/youtubeController");

router.get("/fetch", yt.fetchYouTubeNews);

module.exports = router;