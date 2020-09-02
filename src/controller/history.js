const {
  getAllHistory,
  getHistoryById,
  // joinedHistory,
  // getRecentHistory,
  getHistoryPerDay,
  getTodayIncome,
  comparisonTodayIncome,
  getOderCount,
  comparisonLastWeekOrders,
  getyearlyIncome,
  comparisonLastYearIncome,
  getChartMonthly,
  getChartOtherMonth,
  deleteHistory,
} = require("../model/history");

const helper = require("../helper/index");

module.exports = {
  getAllHistory: async (request, response) => {
    try {
      const result = await getAllHistory();
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
      // console.log(results);
      return helper.response(response, 200, "Sukses Get Per Day", results);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
      // console.log(error);
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
        return value.yesterdayIncome;
      });

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
      const incomeYesterday = mapped3[0] + "%";
      const setData = {
        incomes: result2,
        incomeYesterday,
      };
      // console.log(setData);
      return helper.response(response, 200, "Sukses Get Today Income", setData);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
      // console.log(error);
    }
  },
  getOderCount: async (request, response) => {
    try {
      const result = await getOderCount();
      const mapped = result.map((value) => {
        return value.orders;
      });
      const result2 = mapped[0];
      const lastWeekOrder = await comparisonLastWeekOrders();
      const mapped2 = lastWeekOrder.map((value) => {
        return value.lastWeekCount;
      });
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
      const countLastWeek = mapped3[0] + "%";
      const setData = {
        countThisWeek: result2,
        countLastWeek,
      };
      return helper.response(response, 200, "Sukses Get Count", setData);
      // console.log(setData);
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
          return (value.lastYearIncome = 1);
        } else {
          return value.lastYearIncome;
        }
      });
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
      const countLastYear = mapped3[0] + "%";
      const setData = {
        countThisYear: result2,
        countLastYear,
      };
      // console.log(setData);
      return helper.response(response, 200, "Sukses Get Count", setData);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
      // console.log(error);
    }
  },
  getChartMonthly: async (request, response) => {
    // let { months } = request.query;
    try {
      const result = await getChartMonthly();
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
      // const otherMonth = await getChartOtherMonth(months);
      return helper.response(
        response,
        200,
        "Sukses Get Chart Monthly",
        reduced
      );
      // console.log(otherMonth);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
      // console.log(error);
    }
  },
  deleteHistory: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await deleteHistory(id);
      console.log(result);
      return helper.response(response, 200, "Success History Deleted", result);
    } catch (error) {
      return helper.response(response, 404, "Bad Request", error);
    }
  },
};
