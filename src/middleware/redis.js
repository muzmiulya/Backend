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
        return helper.response(response, 200, JSON.parse(result));
      } else {
        console.log("data tidak ada di dalam redis");
        next();
      }
    });
  },
  //  tambahkan getproduct: yang ada pagination
  getAllProductRedis: (request, response, next) => {
    let { sort, page, limit } = request.query;
    client.get(`getallproduct:${sort}${page}${limit}`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada di dalam redis");
        return helper.response(response, 200, JSON.parse(result));
      } else {
        console.log("data tidak ada di dalam redis");
        next();
      }
    });
  },
  getProductByNameRedis: (request, response, next) => {
    let { search, limit } = request.query;
    client.get(`getallproductbyname:${search}${limit}`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada di dalam redis");
        return helper.response(response, 200, JSON.parse(result));
      } else {
        console.log("data tidak ada di dalam redis");
        next();
      }
    });
  },
  //untuk clear key redis
  clearDataProductRedis: (request, response, next) => {
    client.flushall((error, result) => {
      console.log(result);
    });
    next();
  },
};
