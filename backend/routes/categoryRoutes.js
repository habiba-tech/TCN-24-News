const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// Admin only
router.post("/", protect, authorize("admin"), categoryController.createCategory);
router.put("/:id", protect, authorize("admin"), categoryController.updateCategory);
router.delete("/:id", protect, authorize("admin"), categoryController.deleteCategory);

// Public
router.get("/", categoryController.getAllCategories);

module.exports = router;