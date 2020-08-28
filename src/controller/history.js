const {
  getAllHistory,
  getHistoryById,
  joinHistory,
  getHistoryPerDay,
  getTodayIncome,
  getOderCount,
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
  joinHistory: async (request, response) => {
    try {
      const result = await joinHistory();
      return helper.response(
        response,
        200,
        "Sukses Get Joined History",
        result
      );
      // console.log(result)
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
      // console.log(error)
    }
  },
  getHistoryPerDay: async (request, response) => {
    let { date, interval } = request.query;
    try {
      // const result2 = await joinHistory();
      const result = await getHistoryPerDay(date, interval);
      // const setId = {
      //  history_id: result.history_id
      // }

      // const setData = {
      //   history_id: result.history_id,
      //   history_invoices: result.history_invoices,
      //   history_subtotal: result.history_subtotal,
      //   history_created_at: result.history_created_at,
      //   product_name: result2.product_name,
      //   purchase_qty: result2.purchase_qty,
      // };
      // return helper.response(response, 200, "Sukses Get Per Day", result);
      console.log(result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getTodayIncome: async (request, response) => {
    try {
      const result = await getTodayIncome();

      return helper.response(response, 200, "Sukses Get Income", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getOderCount: async (request, response) => {
    try {
      const result = await getOderCount();

      return helper.response(response, 200, "Sukses Get History", result);
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
