const redis = require("redis");
const client = redis.createClient();
const helper = require("../helper/index");
const { request, response } = require("express");

module.exports = {
  getProductByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get(`getproductbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(
          response,
          200,
          "Success Get Product By Id",
          JSON.parse(result)
        );
      } else {
        next();
      }
    });
  },
  getAllProductRedis: (request, response, next) => {
    client.get(
      `getproductall:${JSON.stringify(request.query)}`,
      (error, result) => {
        if (!error && result != null) {
          const parsed = JSON.parse(result);
          const results = parsed.result;
          const pagination = parsed.pageInfo;
          return helper.response(
            response,
            200,
            "Success Get Product",
            results,
            pagination
          );
        } else {
          next();
        }
      }
    );
  },
  getProductByNameRedis: (request, response, next) => {
    client.get(
      `getproductbyname:${JSON.stringify(request.query)}`,
      (error, result) => {
        if (!error && result != null) {
          const parsed = JSON.parse(result);
          const results = parsed.result;
          const pagination = parsed.pageInfo;
          return helper.response(
            response,
            200,
            "Success Get Product Name",
            results,
            pagination
          );
        } else {
          next();
        }
      }
    );
  },

  // ============================================================================================
  getAllCategoryRedis: (request, response, next) => {
    client.get(`getcategoryall`, (error, result) => {
      if (!error && result != null) {
        return helper.response(
          response,
          200,
          "Success Get All Category",
          JSON.parse(result)
        );
      } else {
        next();
      }
    });
  },
  getCategoryByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get(`getcategorybyid:${id}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(
          response,
          200,
          "Success Get Category By Id",
          JSON.parse(result)
        );
      } else {
        next();
      }
    });
  },
  // ================================================================================
  getAllHistoryRedis: (request, response, next) => {
    client.get(`gethistoryall`, (error, result) => {
      if (!error && result != null) {
        return helper.response(
          response,
          200,
          "Sukses Get History",
          JSON.parse(result)
        );
      } else {
        next();
      }
    });
  },
  getHistoryByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get(`gethistorybyid:${id}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(
          response,
          200,
          "Success Get History By Id",
          JSON.parse(result)
        );
      } else {
        next();
      }
    });
  },
  getHistoryPerDayRedis: (request, response, next) => {
    client.get(
      `gethistoryperday:${JSON.stringify(request.query)}`,
      (error, result) => {
        if (!error && result != null) {
          return helper.response(
            response,
            200,
            "Sukses Get Per Day",
            JSON.parse(result)
          );
        } else {
          next();
        }
      }
    );
  },
  getTodayIncomeRedis: (request, response, next) => {
    client.get(`gethistorytodayincome`, (error, result) => {
      if (!error && result != null) {
        return helper.response(
          response,
          200,
          "Sukses Get Today Income",
          JSON.parse(result)
        );
      } else {
        next();
      }
    });
  },
  getOderCountRedis: (request, response, next) => {
    client.get(`gethistoryordercount`, (error, result) => {
      if (!error && result != null) {
        return helper.response(
          response,
          200,
          "Sukses Get Count",
          JSON.parse(result)
        );
      } else {
        next();
      }
    });
  },
  getyearlyIncomeRedis: (request, response, next) => {
    client.get(`gethistoryyearincome`, (error, result) => {
      if (!error && result != null) {
        return helper.response(
          response,
          200,
          "Sukses Get Yearly Income",
          JSON.parse(result)
        );
      } else {
        next();
      }
    });
  },
  getChartMonthlyRedis: (request, response, next) => {
    client.get(
      `gethistorychartmonthly${JSON.stringify(request.query)}`,
      (error, result) => {
        if (!error && result != null) {
          return helper.response(
            response,
            200,
            "Sukses Get Chart Monthly",
            JSON.parse(result)
          );
        } else {
          next();
        }
      }
    );
  },
  clearDataProductRedis: (request, response, next) => {
    client.keys("getproduct*", (err, keys) => {
      if (keys.length > 0) {
        keys.forEach((value) => {
          client.del(value);
        });
      }
      next();
    });
  },
  clearDataCategoryRedis: (request, response, next) => {
    client.keys("getcategory*", (err, keys) => {
      if (keys.length > 0) {
        keys.forEach((value) => {
          client.del(value);
        });
      }
      next();
    });
  },
  clearDataHistoryRedis: (request, response, next) => {
    client.keys("gethistory*", (err, keys) => {
      if (keys.length > 0) {
        keys.forEach((value) => {
          client.del(value);
        });
      }
      next();
    });
  },
};
