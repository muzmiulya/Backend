const router = require("express").Router();
const {
  getAllPurchase,
  getPurchaseById,
  postOrder,
  deletePurchase,
} = require("../controller/purchase");

router.get("/", getAllPurchase);
router.get("/:id", getPurchaseById);

router.post("/", postOrder);

router.delete("/:id", deletePurchase);

module.exports = router;

