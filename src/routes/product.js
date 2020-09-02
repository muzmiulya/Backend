const router = require("Express").Router();
const {
  getAllProduct,
  getAllProductByName,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct,
} = require("../controller/product");
const { authorization } = require("../middleware/auth");
const {
  getProductByIdRedis,
  getAllProductRedis,
  getProductByNameRedis,
  clearDataProductRedis,
} = require("../middleware/redis");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "./uploads/");
  },
  filename: (request, file, callback) => {
    console.log(file);
    callback(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
let upload = multer({ storage: storage });

//GET
router.get("/", getAllProductRedis, getAllProduct);
router.get("/:id", authorization, getProductByIdRedis, getProductById);
router.get("/search/name", getProductByNameRedis, getAllProductByName);
//POST
router.post("/", upload.single("product_picture"), postProduct);
//PATCH/PUT
router.patch("/:id", clearDataProductRedis, patchProduct);
//DELETE
router.delete("/:id", clearDataProductRedis, deleteProduct);

module.exports = router;
