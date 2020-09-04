const {
  getAllcategory,
  getCategoryById,
  postCategory,
  deleteCategory,
} = require("../model/category");
const redis = require("redis");
const fs = require("fs");
const client = redis.createClient();
const helper = require("../helper/index");
module.exports = {
  getAllCategory: async (request, response) => {
    try {
      const result = await getAllcategory();
      client.setex(`getallcategory`, 3600, JSON.stringify(result));
      return helper.response(response, 200, "Success Get All Category", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
      // console.log(error);
    }
  },
  getCategoryById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getCategoryById(id);
      if (result.length > 0) {
        client.setex(`getcategorybyid:${id}`, 3600, JSON.stringify(result));
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
    if (
      request.body.category_name === undefined ||
      request.body.category_name === null ||
      request.body.category_name === ""
    ) {
      return helper.response(response, 404, "category_id must be filled");
    } else if (
      request.body.category_status === undefined ||
      request.body.category_status === null ||
      request.body.category_status === ""
    ) {
      return helper.response(response, 404, "product_name must be filled");
    }
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
