const router = require("express").Router();
const {
  getAllHistory,
  getHistoryById,
  deleteHistory,
} = require("../controller/history");

router.get("/", getAllHistory);
router.get("/:id", getHistoryById);

router.delete("/:id", deleteHistory);

module.exports = router;
