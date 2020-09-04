const redis = require("redis");
const client = redis.createClient();
const helper = require("../helper/index");
const { request, response } = require("express");

module.exports = {
  getProductByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get(`getproductbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada di dalam redis");
        return helper.response(
          response,
          200,
          "Success Get Product By Id",
          JSON.parse(result)
        );
      } else {
        console.log("data tidak ada di dalam redis");
        next();
      }
    });
  },
  //  tambahkan getproduct: yang ada pagination
  getAllProductRedis: (request, response, next) => {
    client.get(
      `getproductall:${JSON.stringify(request.query)}`,
      (error, result) => {
        // console.log(results);
        if (!error && result != null) {
          const parsed = JSON.parse(result);
          const results = parsed.result;
          const pagination = parsed.pageInfo;
          console.log("data ada di dalam redis");
          return helper.response(
            response,
            200,
            "Success Get Product",
            results,
            pagination
          );
        } else {
          console.log("data tidak ada di dalam redis");
          console.log(result);
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
          console.log("data ada di dalam redis");
          return helper.response(
            response,
            200,
            "Success Get Product Name",
            JSON.parse(result)
          );
        } else {
          console.log("data tidak ada di dalam redis");
          next();
        }
      }
    );
  },

  // ============================================================================================
  getAllCategoryRedis: (request, response, next) => {
    client.get(`getallcategory`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada di dalam redis");
        return helper.response(
          response,
          200,
          "Success Get All Category",
          JSON.parse(result)
        );
      } else {
        console.log("data tidak ada di dalam redis");
        next();
      }
    });
  },
  getCategoryByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get(`getcategorybyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada di dalam redis");
        return helper.response(
          response,
          200,
          "Success Get Category By Id",
          JSON.parse(result)
        );
      } else {
        console.log("data tidak ada di dalam redis");
        next();
      }
    });
  },
  // ================================================================================
  getAllHistoryRedis: (request, response, next) => {
    client.get(`getallhistory`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada di dalam redis");
        return helper.response(
          response,
          200,
          "Sukses Get History",
          JSON.parse(result)
        );
      } else {
        console.log("data tidak ada di dalam redis");
        next();
      }
    });
  },
  getHistoryByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get(`gethistorybyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada di dalam redis");
        return helper.response(
          response,
          200,
          "Success Get History By Id",
          JSON.parse(result)
        );
      } else {
        console.log("data tidak ada di dalam redis");
        next();
      }
    });
  },
  getHistoryPerDayRedis: (request, response, next) => {
    client.get(
      `gethistoryperday:${JSON.stringify(request.query)}`,
      (error, result) => {
        if (!error && result != null) {
          console.log("data ada di dalam redis");
          return helper.response(
            response,
            200,
            "Sukses Get Per Day",
            JSON.parse(result)
          );
        } else {
          console.log("data tidak ada di dalam redis");
          next();
        }
      }
    );
  },
  getTodayIncomeRedis: (request, response, next) => {
    client.get(`gettodayincome`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada di dalam redis");
        return helper.response(
          response,
          200,
          "Sukses Get Today Income",
          JSON.parse(result)
        );
      } else {
        console.log("data tidak ada di dalam redis");
        next();
      }
    });
  },
  getOderCountRedis: (request, response, next) => {
    client.get(`getordercount`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada di dalam redis");
        return helper.response(
          response,
          200,
          "Sukses Get Count",
          JSON.parse(result)
        );
      } else {
        console.log("data tidak ada di dalam redis");
        next();
      }
    });
  },
  getyearlyIncomeRedis: (request, response, next) => {
    client.get(`getyearincome`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada di dalam redis");
        return helper.response(
          response,
          200,
          "Sukses Get Yearly Income",
          JSON.parse(result)
        );
      } else {
        console.log("data tidak ada di dalam redis");
        next();
      }
    });
  },
  getChartMonthlyRedis: (request, response, next) => {
    client.get(`getchartmonthly`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada di dalam redis");
        return helper.response(
          response,
          200,
          "Sukses Get Chart Monthly",
          JSON.parse(result)
        );
      } else {
        console.log("data tidak ada di dalam redis");
        next();
      }
    });
  },
  //untuk clear key redis
  clearDataProductRedis: (request, response, next) => {
    client.keys("getproduct*", (err, keys) => {
      if (keys.length > 0) {
        keys.forEach((value) => {
          client.del(value);
        });
      }
      next();
    });
    // client.flushall((error, result) => {
    //   console.log(result);
    // });
    // next();
  },
};
