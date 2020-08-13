const {
  getAllHistory,
  getHistoryById,
  postHistory,
  patchHistory,
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
      // const id = request.params.id
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
  postHistory: async (request, response) => {
    try {
      const setData = {
        history_invoices: Math.floor(Math.random() * 1000000000) + 1000000000,
        history_subtotal: request.body.history_subtotal,
        history_created_at: new Date(),
      };

      const result = await postHistory(setData);
      console.log(setData);
      return helper.response(response, 200, "Success History Posted", result);
      //   console.log(result);
    } catch (error) {
      return helper.response(response, 404, "Bad Request", error);
      //   console.log(error);
    }
  },
  patchHistory: async (request, response) => {
    try {
      const { id } = request.params;
      const { history_subtotal } = request.body;
      const setData = {
        history_invoices: Math.floor(Math.random() * 1000000000) + 1000000000,
        history_subtotal,
      };
      const checkId = await getHistoryById(id);
      if (checkId.length > 0) {
        const result = await patchHistory(setData, id);
        return helper.response(
          response,
          200,
          "Success History Updated",
          result
        );
      } else {
        return helper.response(response, 404, `History By Id: ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(response, 404, "Bad Request", error);
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
