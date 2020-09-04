const {
  getAllPurchase,
  getPurchaseById,
  postOrder,
  purchaseHistory,
  postPurchase,
  getSubTotal,
  patchHistory,
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
  // getPurchaseById: async (request, response) => {
  //   try {
  //     const { id } = request.params;
  //     const result = await getPurchaseById(id);
  //     if (result.length > 0) {
  //       return helper.response(
  //         response,
  //         200,
  //         "Success Get Purchase By Id",
  //         result
  //       );
  //     } else {
  //       return helper.response(
  //         response,
  //         404,
  //         `Purchase By Id: ${id} Not Found`
  //       );
  //     }
  //   } catch (error) {
  //     return helper.response(response, 400, "Bad Request", error);
  //   }
  // },
  postOrder: async (request, response) => {
    if (
      request.body === undefined ||
      request.body === null ||
      request.body === ""
    ) {
      return helper.response(response, 404, "must input orders");
    } else if (
      request.body.orders === undefined ||
      request.body.orders === null ||
      request.body.orders === ""
    ) {
      return helper.response(response, 404, "orders must be filled");
    }

    try {
      const setData = {
        history_invoices: Math.floor(Math.random() * 1000000000) + 1000000000,
        history_created_at: new Date(),
      };
      const result = await postOrder(setData);

      const requested = await request.body.orders;
      const marble = await Promise.all(
        requested.map(async (value) => {
          if (
            value.product_id === undefined ||
            value.product_id === null ||
            value.product_id === ""
          ) {
            return helper.response(response, 404, "product_id must be filled");
          } else if (
            value.purchase_qty === undefined ||
            value.purchase_qty === null ||
            value.purchase_qty === ""
          ) {
            return helper.response(
              response,
              404,
              "purchase_qty must be filled"
            );
          }
          const result2 = await purchaseHistory(value.product_id);
          const setData2 = {
            history_id: result.history_id,
            product_id: value.product_id,
            purchase_qty: value.purchase_qty,
            purchase_total:
              value.purchase_qty * result2[0].product_price +
              (value.purchase_qty * result2[0].product_price * 10) / 100,
          };
          return (result3 = await postPurchase(setData2));
        })
      );
      const i = result.history_id;
      const result4 = await getSubTotal(i);

      function getNumber(input, field) {
        let output = [];
        for (let i = 0; i < input.length; ++i) output.push(input[i][field]);
        return output;
      }
      subs = getNumber(result4, "SUM(purchase_total)");
      const marbeles = subs.flat();
      const rouke = marbeles.find(Number);
      const setData3 = {
        history_subtotal: rouke,
      };
      const result5 = await patchHistory(setData3, i);
      const data = {
        history_id: result.history_id,
        history_invoices: result.history_invoices,
        orders: marble,
        history_subtotal: result5.history_subtotal,
      };
      return helper.response(response, 200, "Success Order Posted", data);
    } catch (error) {
      return helper.response(response, 404, "Bad Request", error);
    }
  },
};
