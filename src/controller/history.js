const {
  getAllHistory,
  getHistoryById,
  joinedHistory,
  getRecentHistory,
  getTodayIncome,
  getOderCount,
  getyearlyIncome,
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
    try {
      const result = await getRecentHistory();
      const ids = result.map((value) => {
        return value.history_id;
      });
      const id = ids.find(Number);
      const joinHistory = await joinedHistory(id);
      const purchase = joinHistory.map((value) => {
        return value.product_name + " " + "x" + value.purchase_qty;
      });
      const orderer = purchase.toString();
      const mapped = joinHistory.map((value) => {
        return (setData = {
          history_invoices: value.history_invoices,
          history_created_at: value.history_created_at,
          history_subtotal: value.history_subtotal,
        });
      });
      const dataSet = {
        history_invoices: "#" + mapped[0].history_invoices,
        history_created_at: mapped[0].history_created_at.toLocaleString(
          "default",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        ),
        cashier: "Cashier 1",
        orders: orderer,
        history_subtotal: "Rp. " + mapped[0].history_subtotal,
      };
      return helper.response(response, 200, "Sukses Get Per Day", dataSet);
      // console.log(dataSet);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
      // console.log(error);
    }
  },
  getTodayIncome: async (request, response) => {
    try {
      const result = await getTodayIncome();

      return helper.response(response, 200, "Sukses Get Today Income", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getOderCount: async (request, response) => {
    try {
      const result = await getOderCount();

      return helper.response(response, 200, "Sukses Get Count", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getyearlyIncome: async (request, response) => {
    try {
      const result = await getyearlyIncome();

      return helper.response(response, 200, "Sukses Get Yearly Income", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
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
