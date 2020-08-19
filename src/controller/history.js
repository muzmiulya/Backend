const {
  getAllHistory,
  getHistoryById,
  joinHistory,
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
      const getHistory = await getAllHistory();
      const data = {

      }
      if (result.length > 0) {
        // return helper.response(
        //   response,
        //   200,
        //   "Success Get History By Id",
        //   result
        // );
        console.log(result)
      } else {
        return helper.response(response, 404, `History By Id: ${id} Not Found`);
      }
    } catch (error) {
      // return helper.response(response, 400, "Bad Request", error);
      console.log(error)
    }
  },
  // joinHistory: async (request, response) => {
  //   try {
  //     const result = await joinHistory();
  //     return helper.response(response, 200, "Sukses Get History", result);
  //     // console.log(result)
  //   } catch (error) {
  //     return helper.response(response, 400, "Bad Request", error);
  //     // console.log(error)

  //   }
  // },
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
