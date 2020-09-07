const {
  getAllHistory,
  getHistoryById,
  getHistoryPerDay,
  getTodayIncome,
  comparisonTodayIncome,
  getOderCount,
  comparisonLastWeekOrders,
  getyearlyIncome,
  comparisonLastYearIncome,
  getChartMonthly,
} = require("../model/history");
const { request } = require("express");
const redis = require("redis");
const client = redis.createClient();

const helper = require("../helper/index");

module.exports = {
  getAllHistory: async (request, response) => {
    try {
      const result = await getAllHistory();
      client.setex(`gethistoryall`, 3600, JSON.stringify(result));
      return helper.response(response, 200, "Sukses Get History", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getHistoryById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getHistoryById(id);
      if (result.length > 0) {
        client.setex(`gethistorybyid:${id}`, 3600, JSON.stringify(result));
        return helper.response(
          response,
          200,
          "Success Get History By Id",
          result
        );
      } else {
        return helper.response(response, 404, `History By Id: ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },

  getHistoryPerDay: async (request, response) => {
    let { date } = request.query;
    try {
      const result = await getHistoryPerDay(date);
      const mapped = result.map((value) => {
        return (setData = {
          history_id: value.history_id,
          history_invoices: "SIE-" + value.history_invoices,
          history_created_at: value.history_created_at.toLocaleString(
            "default",
            {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }
          ),
          orders: value.product_name + " " + "x" + value.purchase_qty,
          history_subtotal: "Rp. " + value.history_subtotal,
        });
      });

      let output = [];
      mapped.forEach((item) => {
        let existing = output.filter((v, i) => {
          return v.history_id == item.history_id;
        });
        if (existing.length) {
          let existingIndex = output.indexOf(existing[0]);
          output[existingIndex].orders = output[existingIndex].orders.concat(
            item.orders
          );
        } else {
          if (typeof item.orders == "string") {
            item.orders = [item.orders];
          }
          output.push(item);
        }
      });

      const results = output.map((value) => {
        return (setData2 = {
          history_id: value.history_id,
          history_invoices: value.history_invoices,
          history_created_at: value.history_created_at,
          cashier: "Cashier 1",
          orders: value.orders.toString(),
          history_subtotal: value.history_subtotal,
        });
      });
      client.setex(
        `gethistoryperday:${JSON.stringify(request.query)}`,
        3600,
        JSON.stringify(results)
      );
      return helper.response(response, 200, "Sukses Get Per Day", results);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getTodayIncome: async (request, response) => {
    try {
      const result = await getTodayIncome();
      const mapped = result.map((value) => {
        if (
          value.income === undefined ||
          value.income === null ||
          value.income === ""
        ) {
          return (value.income = 0);
        } else {
          return value.income;
        }
      });
      const result2 = mapped[0];
      const incomeYes = await comparisonTodayIncome();
      const mapped2 = incomeYes.map((value) => {
        if (
          value.yesterdayIncome === undefined ||
          value.yesterdayIncome === null ||
          value.yesterdayIncome === ""
        ) {
          return (value.yesterdayIncome = 0);
        } else {
          return value.yesterdayIncome;
        }
      });
      console.log(mapped2);
      if (mapped2[0] == 0) {
        incomeYesterday = "+" + result2 * 100 + "%";
      } else {
        const mapped3 = mapped2.map((value) => {
          if (value > result2) {
            let values = value - result2;
            let count = (values / value) * 100;
            return "-" + count.toFixed(2);
          } else if (value < result2) {
            let values = result2 - value;
            let count = (values / value) * 100;
            return "+" + count.toFixed(2);
          } else if ((value = result2)) {
            let values = 0;
            return "+" + values;
          }
        });
        incomeYesterday = mapped3[0] + "%";
      }

      const setData = {
        incomes: result2,
        incomeYesterday,
      };
      client.setex(`gethistorytodayincome`, 3600, JSON.stringify(setData));
      return helper.response(response, 200, "Sukses Get Today Income", setData);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getOderCount: async (request, response) => {
    try {
      const result = await getOderCount();
      const mapped = result.map((value) => {
        return value.orders;
      });
      const result2 = mapped[0];
      console.log(mapped);
      const lastWeekOrder = await comparisonLastWeekOrders();
      const mapped2 = lastWeekOrder.map((value) => {
        if (
          value.lastWeekCount === undefined ||
          value.lastWeekCount === null ||
          value.lastWeekCount === ""
        ) {
          return (value.lastWeekCount = 0);
        } else {
          return value.lastWeekCount;
        }
      });
      if (mapped2[0] == 0) {
        countLastWeek = "+" + result2 * 100 + "%";
      } else {
        const mapped3 = mapped2.map((value) => {
          if (value > result2) {
            let values = value - result2;
            let count = (values / value) * 100;
            return "-" + count.toFixed(2);
          } else if (value < result2) {
            let values = result2 - value;
            let count = (values / value) * 100;
            return "+" + count.toFixed(2);
          } else if ((value = result2)) {
            let values = 0;
            return "+" + values;
          }
        });
        countLastWeek = mapped3[0] + "%";
      }

      const setData = {
        countThisWeek: result2,
        countLastWeek,
      };
      client.setex(`gethistoryordercount`, 3600, JSON.stringify(setData));
      return helper.response(response, 200, "Sukses Get Count", setData);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getyearlyIncome: async (request, response) => {
    try {
      const result = await getyearlyIncome();
      const mapped = result.map((value) => {
        return value.yearly;
      });
      const result2 = mapped[0];
      const lastYIncome = await comparisonLastYearIncome();
      const mapped2 = lastYIncome.map((value) => {
        if (
          value.lastYearIncome === undefined ||
          value.lastYearIncome === null ||
          value.lastYearIncome === ""
        ) {
          return (value.lastYearIncome = 0);
        } else {
          return value.lastYearIncome;
        }
      });

      if (mapped2[0] == 0) {
        countLastYear = "+" + result2 * 100 + "%";
      } else {
        const mapped3 = mapped2.map((value) => {
          if (value > result2) {
            let values = value - result2;
            let count = (values / value) * 100;
            return "-" + count.toFixed(2);
          } else if (value < result2) {
            let values = result2 - value;
            let count = (values / value) * 100;
            return "+" + count.toFixed(2);
          } else if ((value = result2)) {
            let values = 0;
            return "+" + values;
          }
        });
        countLastYear = mapped3[0] + "%";
      }
      const setData = {
        countThisYear: result2,
        countLastYear,
      };
      client.setex(`gethistoryyearincome`, 3600, JSON.stringify(setData));
      return helper.response(
        response,
        200,
        "Sukses Get Yearly Income",
        setData
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getChartMonthly: async (request, response) => {
    let { months } = request.query;
    try {
      const result = await getChartMonthly(months);
      const mapped = result.map((value) => {
        return (setData = {
          history_created_at: value.historyDate.getDate(),
          history_subtotal: value.historySub,
        });
      });
      const reduced = mapped.reduce((acc, item) => {
        acc[item.history_created_at] = item.history_subtotal;
        return acc;
      }, {});
      console.log(reduced);
      client.setex(
        `gethistorychartmonthly${JSON.stringify(request.query)}`,
        3600,
        JSON.stringify(reduced)
      );
      return helper.response(
        response,
        200,
        "Sukses Get Chart Monthly",
        reduced
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
