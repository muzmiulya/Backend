const router = require("express").Router();
const {
  getAllProduct,
  getAllProductByName,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct,
} = require("../controller/product");
const { authorization, authorization2 } = require("../middleware/auth");
const {
  getProductByIdRedis,
  getAllProductRedis,
  getProductByNameRedis,
  clearDataProductRedis,
} = require("../middleware/redis");

const uploadImage = require("../middleware/multer");

router.get("/", authorization, getAllProductRedis, getAllProduct);
router.get("/:id", authorization, getProductByIdRedis, getProductById);
router.get(
  "/search/name",
  authorization,
  getProductByNameRedis,
  getAllProductByName
);
router.post(
  "/",
  authorization2,
  clearDataProductRedis,
  uploadImage,
  postProduct
);
router.patch(
  "/:id",
  authorization2,
  clearDataProductRedis,
  uploadImage,
  patchProduct
);
router.delete("/:id", authorization2, clearDataProductRedis, deleteProduct);

module.exports = router;
