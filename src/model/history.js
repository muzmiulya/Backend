const connection = require("../config/mysql");

module.exports = {
  getAllHistory: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM history", (error, result) => {
        !error ? resolve(result) : reject(new Error(error));
      });
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
  getHistoryPerDay: (date) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT history.history_id, history.history_invoices, history.history_user_name, purchase.purchase_id, purchase.product_id, product.product_name, purchase.purchase_qty, purchase.purchase_total, history.history_subtotal, history.history_created_at FROM history INNER JOIN purchase ON history.history_id = purchase.history_id INNER JOIN product ON purchase.product_id = product.product_id WHERE ${date}(history.history_created_at) = ${date}(NOW()) ORDER BY history.history_id DESC`,

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
  comparisonTodayIncome: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT SUM(history_subtotal) AS yesterdayIncome From history WHERE DATE(history_created_at) = DATE(NOW()- INTERVAL 1 DAY )",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getOderCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) AS orders FROM history WHERE WEEK(history_created_at) = WEEK(NOW())",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  comparisonLastWeekOrders: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) AS lastWeekCount From history WHERE WEEK(history_created_at) = WEEK(NOW()- INTERVAL 1 WEEK )",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getyearlyIncome: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT SUM(history_subtotal) AS yearly From history WHERE YEAR(history_created_at) = YEAR(NOW())",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  comparisonLastYearIncome: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT SUM(history_subtotal) AS lastYearIncome From history WHERE YEAR(history_created_at) = YEAR(NOW() - INTERVAL 1 YEAR)",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getChartMonthly: (months) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT DATE(history_created_at) AS historyDate, sum(history_subtotal) AS historySub FROM history WHERE MONTH(history_created_at) = ${months} AND YEAR(history_created_at) = YEAR(NOW()) GROUP BY DATE(history_created_at)`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
};
