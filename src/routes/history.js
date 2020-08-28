const router = require("express").Router();
const {
  getAllHistory,
  getHistoryById,
  joinHistory,
  getHistoryPerDay,
  getTodayIncome,
  getOderCount,
  deleteHistory,
} = require("../controller/history");

router.get("/", getAllHistory);
router.get("/:id", getHistoryById);
router.get("/join/join", joinHistory);
router.get("/days/days", getHistoryPerDay);
router.get("/income/today", getTodayIncome);
router.get("/order/count", getOderCount);

router.delete("/:id", deleteHistory);

module.exports = router;
