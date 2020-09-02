const router = require("express").Router();
const {
  getAllHistory,
  getHistoryById,
  getHistoryPerDay,
  getTodayIncome,
  getOderCount,
  getyearlyIncome,
  getChartMonthly,
  deleteHistory,
} = require("../controller/history");
// const {
//   getProductByIdRedis,
//   getAllProductRedis,
//   getProductByNameRedis,
//   clearDataProductRedis,
// } = require("../middleware/redis");

router.get("/", getAllHistory);
router.get("/:id", getHistoryById);
router.get("/days/days", getHistoryPerDay);
router.get("/income/today", getTodayIncome);
router.get("/order/count", getOderCount);
router.get("/income/year", getyearlyIncome);
router.get("/chart/monthly", getChartMonthly);

router.delete("/:id", deleteHistory);

module.exports = router;
