const {
  getAllPurchase,
  getJoinPurchase,
  getPurchaseById,
  postPurchase,
  patchPurchase,
  deletePurchase,
} = require("../model/purchase");
const helper = require("../helper/index");

module.exports = {
  // getAllPurchase: async (request, response) => {
  //   try {
  //     const result = await getAllPurchase();
  //     return helper.response(response, 200, "Sukses Get Purchase", result);
  //   } catch (error) {
  //     return helper.response(response, 400, "Bad Request", error);
  //   }
  // },
  getPurchaseById: async (request, response) => {
    try {
      // const id = request.params.id
      const { id } = request.params;
      const result = await getPurchaseById(id);
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Success Get Purchase By Id",
          result
        );
      } else {
        return helper.response(
          response,
          404,
          `Purchase By Id: ${id} Not Found`
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  postPurchase: async (request, response) => {
    try {
      const setData = {
        purchase_qty: request.body.purchase_qty,
        purchase_total: product_price * purchase_qty,
      };
      const result = await postPurchase(setData);
      console.log(setData);
      return helper.response(response, 200, "Success Purchase Posted", result);
      //   console.log(result);
    } catch (error) {
      return helper.response(response, 404, "Bad Request", error);
      //   console.log(error);
    }
  },
  patchPurchase: async (request, response) => {
    try {
      const { id } = request.params;
      const { purchase_qty, purchase_ppn, purchase_total } = request.body;
      const setData = {
        history_id,
        product_id,
        purchase_qty,
        purchase_ppn,
        purchase_total,
      };
      const checkId = await getPurchaseById(id);
      if (checkId.length > 0) {
        const result = await patchPurchase(setData, id);
        return helper.response(
          response,
          200,
          "Success Purchase Updated",
          result
        );
      } else {
        return helper.response(
          response,
          404,
          `Purchase By Id: ${id} Not Found`
        );
      }
    } catch (error) {
      return helper.response(response, 404, "Bad Request", error);
    }
  },
  // deletePurchase: async (request, response) => {
  //   try {
  //     const { id } = request.params;
  //     const result = await deletePurchase(id);
  //     console.log(result);
  //     return helper.response(response, 200, "Success Purchase Deleted", result);
  //   } catch (error) {
  //     return helper.response(response, 404, "Bad Request", error);
  //   }
  // },
};
