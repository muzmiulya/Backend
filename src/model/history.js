const connection = require("../config/mysql");

module.exports = {
  getAllHistory: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM history", (error, result) => {
        !error ? resolve(result) : reject(new Error(error));
      });
    });
  },
  // getHistoryById: (id) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       "SELECT * FROM history WHERE history_id = ?",
  //       id,
  //       (error, result) => {
  //         !error ? resolve(result) : reject(new Error(error));
  //       }
  //     );
  //   });
  // },
  postHistory: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO history SET ?",
        setData,
        (error, result) => {
          // console.log(result);
          if (!error) {
            const newResult = {
              history_id: result.insertId,
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
  purchaseHistory: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM product WHERE product_id = ?",
        id,
        (error, result) => {
          // console.log(result)
          !error ? resolve(result) : reject(new Error(error))

        }
      );
    });
  },
  postPurchase: (setData2) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO purchase SET ?",
        setData2,
        (error, result) => {
          if (!error) {
            const newResult = {
              purchase_id: result.insertId,
              ...setData2,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  getSubTotal: (i) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT SUM(purchase_total) FROM purchase WHERE history_id = ?", i,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        });
    });
  },
  patchHistory: (setData3, d) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE history SET ? WHERE history_id = ?",
        [setData3, d],
        (error, result) => {
          if (!error) {
            const newResult = {
              history_id: d,
              ...setData3,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },

  // deleteHistory: (id) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       "DELETE FROM history WHERE history_id = ?",
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
