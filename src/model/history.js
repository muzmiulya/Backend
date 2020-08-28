const connection = require("../config/mysql");

module.exports = {
  getAllHistory: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM history", (error, result) => {
        !error ? resolve(result) : reject(new Error(error));
      });
    });
  },
  joinHistory: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT history.history_id, history.history_invoices, purchase.purchase_id, purchase.product_id, product.product_name, purchase.purchase_qty, purchase.purchase_total, history.history_subtotal, history.history_created_at FROM history INNER JOIN purchase ON history.history_id = purchase.history_id INNER JOIN product ON purchase.product_id = product.product_id",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getHistoryById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM history WHERE history_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getHistoryPerDay: (date, interval) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM history WHERE ${date}(history_created_at) = ${date}(NOW() - INTERVAL ${interval} DAY)`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getTodayIncome: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT SUM(history_subtotal) AS income From history WHERE DATE(history_created_at) = DATE(NOW())",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getOderCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) AS orders FROM history WHERE WEEK(history_created_at) = WEEK(NOW()) GROUP BY WEEK(NOW())",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  deleteHistory: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM history WHERE history_id = ?",
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
