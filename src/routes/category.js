const router = require("Express").Router();
const {
  getAllCategory,
  getCategoryById,
  postCategory,
  deleteCategory,
} = require("../controller/category");

router.get("/", getAllCategory);
router.get("/:id", getCategoryById);

router.post("/", postCategory);

router.delete("/:id", deleteCategory);

module.exports = router;
