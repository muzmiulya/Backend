const router = require("express").Router();
const {
  getAllHistory,
  getHistoryById,
  getHistoryPerDay,
  getTodayIncome,
  getOderCount,
  getyearlyIncome,
  getChartMonthly,
} = require("../controller/history");
const { authorization } = require("../middleware/auth");
const {
  getAllHistoryRedis,
  getHistoryByIdRedis,
  getHistoryPerDayRedis,
  getTodayIncomeRedis,
  getOderCountRedis,
  getyearlyIncomeRedis,
  getChartMonthlyRedis,
} = require("../middleware/redis");

router.get("/", authorization, getAllHistoryRedis, getAllHistory);
router.get("/:id", authorization, getHistoryByIdRedis, getHistoryById);
router.get(
  "/days/days",
  authorization,
  getHistoryPerDayRedis,
  getHistoryPerDay
);
router.get("/income/today", authorization, getTodayIncomeRedis, getTodayIncome);
router.get("/order/count", authorization, getOderCountRedis, getOderCount);
router.get(
  "/income/year",
  authorization,
  getyearlyIncomeRedis,
  getyearlyIncome
);
router.get(
  "/chart/monthly",
  authorization,
  getChartMonthlyRedis,
  getChartMonthly
);

module.exports = router;
