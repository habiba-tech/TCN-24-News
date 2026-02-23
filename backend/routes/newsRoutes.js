const router = require("express").Router();
const news = require("../controllers/newsController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.get("/", news.getAllNews);
router.get("/breaking", news.getBreakingNews);
router.get("/search", news.searchNews);

router.post("/", protect, authorize("admin","editor"), news.createNews);
router.delete("/:id", protect, authorize("admin"), news.deleteNews);

module.exports = router;