const router = require("Express").Router();
const {
  getAllProduct,
  getAllProductByName,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct,
} = require("../controller/product");

//GET
router.get("/", getAllProduct);
router.get("/:id", getProductById);
router.get("/search/name", getAllProductByName);
//POST
router.post("/", postProduct);
//PATCH/PUT
router.patch("/:id", patchProduct);
//DELETE
router.delete("/:id", deleteProduct);

module.exports = router;
