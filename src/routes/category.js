const router = require("Express").Router();
const {
  getAllCategory,
  getCategoryById,
  postCategory,
  deleteCategory,
} = require("../controller/category");
const { authorization, authorization2 } = require("../middleware/auth");
const {
  getAllCategoryRedis,
  getCategoryByIdRedis,
  clearDataProductRedis,
} = require("../middleware/redis");

router.get("/", authorization, getAllCategoryRedis, getAllCategory);
router.get("/:id", authorization, getCategoryByIdRedis, getCategoryById);

router.post("/", authorization2, clearDataProductRedis, postCategory);

router.delete("/:id", authorization2, clearDataProductRedis, deleteCategory);

module.exports = router;
