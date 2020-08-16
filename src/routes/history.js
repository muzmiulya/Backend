const router = require("express").Router();
const {
  getAllHistory,
  // getHistoryById,
  postHistory,
  // purchaseHistory
  // patchHistory,
  // deleteHistory,
} = require("../controller/history");

router.get("/", getAllHistory);
// router.get("/:id", getHistoryById);

router.post("/", postHistory);

// router.post("/purchase", purchaseHistory)

// router.patch("/:id", patchHistory);

// router.delete("/:id", deleteHistory);

module.exports = router;
