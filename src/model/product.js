const connection = require("../config/mysql");
const product = require("../controller/product");
module.exports = {
  // getProduct: (search, sort, limit, offset) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(`SELECT * FROM product WHERE product_name LIKE ? ORDER BY ${sort}${ASC / DESC} LIMIT ? OFFSET ?`, [search, sort, limit, offset], (error, result) => {
  //       !error ? resolve(result) : reject(new Error(error));
  //     });
  //   });
  // },
  getProduct: (search, sort, page, limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM product WHERE product_name LIKE ? LIMIT ? OFFSET ?`, [search, sort, page, limit, offset], (error, result) => {
        !error ? resolve(result) : reject(new Error(error));
      });
    });
  },
  getProductCount: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT COUNT(*) as total FROM product ", (error, result) => {
        !error ? resolve(result[0].total) : reject(new Error(error));
      })
    })
  },
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM product WHERE product_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  postProduct: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO product SET ?",
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              product_id: result.insertId,
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
  patchProduct: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE product SET ? WHERE product_id = ?",
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              product_id: id,
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
  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM product WHERE product_id = ?",
        id,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },

};
