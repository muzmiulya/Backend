const router = require("express").Router();
const {
  getAllCategory,
  getCategoryById,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../controller/category");
const { authorization, authorization2 } = require("../middleware/auth");
const {
  getAllCategoryRedis,
  getCategoryByIdRedis,
  clearDataCategoryRedis,
} = require("../middleware/redis");

router.get("/", authorization, getAllCategoryRedis, getAllCategory);
router.get("/:id", authorization, getCategoryByIdRedis, getCategoryById);

router.post("/", authorization2, clearDataCategoryRedis, postCategory);
router.patch("/:id", authorization2, clearDataCategoryRedis, patchCategory);

router.delete("/:id", authorization2, clearDataCategoryRedis, deleteCategory);

module.exports = router;
