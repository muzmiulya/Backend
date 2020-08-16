const router = require("express").Router();
const {
  // getAllPurchase,
  getPurchaseById,
  postPurchase,
  patchPurchase,
  // deletePurchase,
  // getJoinPurchase,
} = require("../controller/purchase");

// router.get("/", getAllPurchase);
router.get("/:id", getPurchaseById);
// router.get("/join/:join", getJoinPurchase);

router.post("/", postPurchase);

router.patch("/:id", patchPurchase);

// router.delete("/:id", deletePurchase);

module.exports = router;
