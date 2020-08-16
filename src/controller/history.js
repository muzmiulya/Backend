const {
  // getAllHistory,
  // getHistoryById,
  postHistory,
  purchaseHistory,
  postPurchase,
  getSubTotal,
  patchHistory,
  // deleteHistory,
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
  // getHistoryById: async (request, response) => {
  //   try {
  //     // const id = request.params.id
  //     const { id } = request.params;
  //     const result = await getHistoryById(id);
  //     if (result.length > 0) {
  //       return helper.response(
  //         response,
  //         200,
  //         "Success Get History By Id",
  //         result
  //       );
  //     } else {
  //       return helper.response(response, 404, `History By Id: ${id} Not Found`);
  //     }
  //   } catch (error) {
  //     return helper.response(response, 400, "Bad Request", error);
  //   }
  // },
  postHistory: async (request, response) => {
    try {
      const setData = {
        history_invoices: Math.floor(Math.random() * 1000000000) + 1000000000,
        history_created_at: new Date(),
      };
      const result = await postHistory(setData)


      const requested = await request.body.orders
      const marble = await Promise.all(requested.map(async (value) => {
        const result2 = await purchaseHistory(value.product_id)
        // console.log(result2)
        const setData2 = {
          history_id: result.history_id,
          product_id: value.product_id,
          purchase_qty: value.purchase_qty,
          purchase_total: value.purchase_qty * result2[0].product_price + (value.purchase_qty * result2[0].product_price * 10 / 100),
        }
        return result3 = await postPurchase(setData2)
        // console.log(result3)

      }))
      // console.log(marble)
      const i = result.history_id
      const result4 = await getSubTotal(i)
      function getNumber(input, field) {
        let output = [];
        for (let i = 0; i < input.length; ++i)
          output.push(input[i][field]);
        return output;
      }
      subs = getNumber(result4, 'SUM(purchase_total)')
      const marbeles = subs.flat()
      const rouke = marbeles.find(Number)
      // console.log(rouke)
      const setData3 = {
        history_subtotal: rouke
      }
      // console.log(setData3)
      const result5 = await patchHistory(setData3, i)
      // console.log(result5)


      const datas = {
        history_id: result.history_id,
        history_invoices: result.history_invoices,
      }
      const datar = {
        history_subtotal: result5.history_subtotal
      }
      marble.push(datar)
      marble.unshift(datas)
      console.log(marble)


      return helper.response(response, 200, "Success History Posted", marble);
    } catch (error) {
      return helper.response(response, 404, "Bad Request", error);

    }
  },
  // purchaseHistory: async (request, response) => {
  //   try {
  // const totalHarga = (product_price, purchase_qty) => { return product_price * purchase_qty }
  // const setData = {
  // product_price,
  // purchase_qty: request.body.purchase_qty,
  // purchase_total: product_price * purchase_qty,
  // };
  // const result = await purchaseHistory(setData);
  // console.log(setData);
  // return helper.response(response, 200, "Success Purchase Posted", result);
  //   console.log(result);
  // } catch (error) {
  // return helper.response(response, 404, "Bad Request", error);
  // console.log(error);
  //   }

  // },
  // patchHistory: async (request, response) => {
  //   try {
  //     const { id } = request.params;
  //     const { history_subtotal } = request.body;
  //     const setData = {
  //       history_invoices: Math.floor(Math.random() * 100000000) + 100000000,
  //       history_subtotal,
  //     };
  //     const checkId = await getHistoryById(id);
  //     if (checkId.length > 0) {
  //       const result = await patchHistory(setData, id);
  //       return helper.response(
  //         response,
  //         200,
  //         "Success History Updated",
  //         result
  //       );
  //     } else {
  //       return helper.response(response, 404, `History By Id: ${id} Not Found`);
  //     }
  //   } catch (error) {
  //     return helper.response(response, 404, "Bad Request", error);
  //   }
  // },
  // deleteHistory: async (request, response) => {
  //   try {
  //     const { id } = request.params;
  //     const result = await deleteHistory(id);
  //     console.log(result);
  //     return helper.response(response, 200, "Success History Deleted", result);
  //   } catch (error) {
  //     return helper.response(response, 404, "Bad Request", error);
  //   }
  // },
};
