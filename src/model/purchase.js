const connection = require("../config/mysql");

module.exports = {
  getAllPurchase: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM purchase", (error, result) => {
        !error ? resolve(result) : reject(new Error(error));
      });
    });
  },
  getPurchaseById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM purchase WHERE purchase_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  postPurchase: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO purchase SET ?",
        setData,
        (error, result) => {
          // console.log(result);
          if (!error) {
            const newResult = {
              purchase_id: result.insertId,
              ...setData,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  patchPurchase: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE purchase SET ? WHERE purchase_id = ?",
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              purchase_id: id,
              ...setData,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  // deletePurchase: (id) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       "DELETE FROM purchase WHERE purchase_id = ?",
  //       id,
  //       (error, result) => {
  //         if (!error) {
  //           const newResult = {
  //             id: id,
  //           };
  //           resolve(newResult);
  //         } else {
  //           reject(new Error(error));
  //         }
  //       }
  //     );
  //   });
  // },
};
