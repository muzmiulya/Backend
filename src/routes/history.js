const router = require("express").Router();
const {
  getAllHistory,
  getHistoryById,
  // joinHistory,
  deleteHistory,
} = require("../controller/history");

router.get("/", getAllHistory);
router.get("/:id", getHistoryById);
// router.get("/join/join", joinHistory);

router.delete("/:id", deleteHistory);

module.exports = router;
