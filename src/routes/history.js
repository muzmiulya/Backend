const router = require("express").Router();
const {
  getAllHistory,
  getHistoryById,
  getHistoryPerDay,
  getTodayIncome,
  getOderCount,
  getyearlyIncome,
  deleteHistory,
} = require("../controller/history");

router.get("/", getAllHistory);
router.get("/:id", getHistoryById);
router.get("/days/days", getHistoryPerDay);
router.get("/income/today", getTodayIncome);
router.get("/order/count", getOderCount);
router.get("/income/year", getyearlyIncome);

router.delete("/:id", deleteHistory);

module.exports = router;
