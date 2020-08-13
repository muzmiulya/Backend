const {
  getAllProduct,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct,
} = require("../model/product");
const helper = require("../helper/index.js");

module.exports = {
  getAllProduct: async (request, response) => {
    try {
      const result = await getAllProduct();
      return helper.response(response, 200, "Success Get Product", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getProductById: async (request, response) => {
    try {
      // const id = request.params.id
      const { id } = request.params;
      const result = await getProductById(id);
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Success Get Product By Id",
          result
        );
      } else {
        return helper.response(response, 404, `Product By Id: ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  postProduct: async (request, response) => {
    try {
      const setData = {
        product_name: request.body.product_name,
        product_price: request.body.product_price,
        product_created_at: new Date(),
        product_status: request.body.product_status,
      };
      const result = await postProduct(setData);
      console.log(setData);
      return helper.response(response, 200, "Success Product Posted", result);
    } catch (error) {
      return helper.response(response, 404, "Bad Request", error);
    }
  },
  patchProduct: async (request, response) => {
    try {
      const { id } = request.params;
      const { product_name, product_price, product_status } = request.body;
      const setData = {
        product_name,
        product_price,
        product_updated_at: new Date(),
        product_status,
      };
      const checkId = await getProductById(id);
      if (checkId.length > 0) {
        const result = await patchProduct(setData, id);
        return helper.response(
          response,
          200,
          "Success Product Updated",
          result
        );
      } else {
        return helper.response(response, 404, `Product By Id: ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(response, 404, "Bad Request", error);
    }
  },
  deleteProduct: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await deleteProduct(id);
      console.log(result);
      return helper.response(response, 200, "Success Product Deleted", result);
    } catch (error) {
      return helper.response(response, 404, "Bad Request", error);
    }
  },
};
