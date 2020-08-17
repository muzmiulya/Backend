const {
  getAllcategory,
  getCategoryById,
  postCategory,
  deleteCategory,
} = require("../model/category");
const helper = require("../helper/index");
module.exports = {
  getAllCategory: async (request, response) => {
    try {
      const result = await getAllcategory();
      return helper.response(response, 200, "Success Get Category", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getCategoryById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getCategoryById(id);
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Success Get Category By Id",
          result
        );
      } else {
        return helper.response(
          response,
          404,
          `Category By Id: ${id} Not Found`
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  postCategory: async (request, response) => {
    // console.log(request.body);
    try {
      const setData = {
        category_name: request.body.category_name,
        category_created_at: new Date(),
        category_status: request.body.category_status,
      };
      const result = await postCategory(setData);
      console.log(setData);
      return helper.response(response, 200, "Success Post Category", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  deleteCategory: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await deleteCategory(id);
      console.log(result);
      return helper.response(response, 200, "Success Category Deleted", result);
    } catch (error) {
      return helper.response(response, 404, "Bad Request", error);
    }
  },
};
