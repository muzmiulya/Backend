const router = require("express").Router();
const {
  // getAllPurchase,
  // getPurchaseById,
  postOrder,
} = require("../controller/purchase");
const { authorization } = require("../middleware/auth");
const { clearDataHistoryRedis } = require("../middleware/redis");

// router.get("/", getAllPurchase);
// router.get("/:id", getPurchaseById);

router.post("/", authorization, clearDataHistoryRedis, postOrder);

module.exports = router;
