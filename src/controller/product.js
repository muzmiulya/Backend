const {
  getProduct,
  getProductByName,
  getProductCount,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct,
} = require("../model/product");
const qs = require("querystring");
const helper = require("../helper/index.js");
const { request } = require("express");
const redis = require("redis");
const client = redis.createClient();

const getPrevLink = (page, currentQuery) => {
  if (page > 1) {
    const generatedPage = {
      page: page - 1,
    };
    const resultPrevLink = { ...currentQuery, ...generatedPage };
    return qs.stringify(resultPrevLink);
  } else {
    return null;
  }
};

const getNextLink = (page, totalPage, currentQuery) => {
  if (page < totalPage) {
    const generatedPage = {
      page: page + 1,
    };
    const resultNextLink = { ...currentQuery, ...generatedPage };
    return qs.stringify(resultNextLink);
  } else {
    return null;
  }
};

module.exports = {
  getAllProduct: async (request, response) => {
    let { sort, page, limit } = request.query;

    if (sort === undefined || sort === null || sort === "") {
      sort = `product_id`;
    }
    if (page === undefined || page === null || page === "") {
      page = parseInt(1);
    } else {
      page = parseInt(page);
    }
    if (limit === undefined || limit === null || limit === "") {
      limit = parseInt(9);
    } else {
      limit = parseInt(limit);
    }
    let totalData = await getProductCount();
    let totalPage = Math.ceil(totalData / limit);
    let limits = page * limit;
    let offset = page * limit - limit;
    let prevLink = getPrevLink(page, request.query);
    let nextLink = getNextLink(page, totalPage, request.query);

    const pageInfo = {
      page,
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3001/product?${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3001/product?${nextLink}`,
    };
    try {
      const result = await getProduct(sort, limit, offset);
      client.set(
        `getproduct:${JSON.stringify(request.query)}`,
        JSON.stringify(result)
      );
      // proses data result ke dalam redis
      // client.set('getproduct:page=2&limit=1','')
      return helper.response(
        response,
        200,
        "Success Get Product",
        result,
        pageInfo
      );
      // console.log(result, pageInfo)
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
      // console.log(error)
    }
  },
  getAllProductByName: async (request, response) => {
    let { search, limit } = request.query;

    if (search === undefined || search === null || search === "") {
      search = "%";
    } else {
      search = "%" + search + "%";
    }
    if (limit === undefined || limit === null || limit === "") {
      limit = parseInt(9);
    } else {
      limit = parseInt(limit);
    }

    try {
      const result = await getProductByName(search, limit);
      return helper.response(response, 200, "Success Get Product Name", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getProductById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getProductById(id);
      client.setex(`getproductbyid:${id}`, 3600, JSON.stringify(result));
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Success Get Product By Id",
          result
        );
      } else {
        return helper.response(response, 404, `Product By Id: ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  postProduct: async (request, response) => {
    if (
      request.body.category_id === undefined ||
      request.body.category_id === null ||
      request.body.category_id === ""
    ) {
      return helper.response(response, 404, "category_id must be filled");
    } else if (
      request.body.product_name === undefined ||
      request.body.product_name === null ||
      request.body.product_name === ""
    ) {
      return helper.response(response, 404, "product_name must be filled");
    } else if (
      request.body.product_price === undefined ||
      request.body.product_price === null ||
      request.body.product_price === ""
    ) {
      return helper.response(response, 404, "product_price must be filled");
    } else if (
      request.body.product_status === undefined ||
      request.body.product_status === null ||
      request.body.product_status === ""
    ) {
      return helper.response(response, 404, "product_status must be filled");
    }
    try {
      console.log(request.file);
      const setData = {
        category_id: request.body.category_id,
        product_name: request.body.product_name,
        product_price: request.body.product_price,
        product_picture:
          request.file === undefined ? "" : request.file.filename,
        product_created_at: new Date(),
        product_status: request.body.product_status,
      };
      console.log(setData);
      const result = await postProduct(setData);
      // console.log(setData);
      return helper.response(response, 200, "Success Product Posted", result);
      console.log(result);
    } catch (error) {
      return helper.response(response, 404, "Bad Request", error);
      // console.log(error);
    }
  },
  patchProduct: async (request, response) => {
    // if (
    //   request.body.category_id === undefined ||
    //   request.body.category_id === null ||
    //   request.body.category_id === ""
    // ) {
    //   return helper.response(response, 404, "category_id must be filled");
    // } else if (
    //   request.body.product_name === undefined ||
    //   request.body.product_name === null ||
    //   request.body.product_name === ""
    // ) {
    //   return helper.response(response, 404, "product_name must be filled");
    // } else if (
    //   request.body.product_price === undefined ||
    //   request.body.product_price === null ||
    //   request.body.product_price === ""
    // ) {
    //   return helper.response(response, 404, "product_price must be filled");
    // } else if (
    //   request.body.product_picture === undefined ||
    //   request.body.product_picture === null ||
    //   request.body.product_picture === ""
    // ) {
    //   return helper.response(response, 404, "product_picture must be filled");
    // } else if (
    //   request.body.product_status === undefined ||
    //   request.body.product_status === null ||
    //   request.body.product_status === ""
    // ) {
    //   return helper.response(response, 404, "product_status must be filled");
    // }
    try {
      const { id } = request.params;
      const {
        category_id,
        product_name,
        product_price,
        product_picture,
        product_status,
      } = request.body;
      const setData = {
        category_id,
        product_name,
        product_price,
        product_picture,
        product_updated_at: new Date(),
        product_status,
      };
      const checkId = await getProductById(id);
      if (checkId.length > 0) {
        const result = await patchProduct(setData, id);
        return helper.response(
          response,
          200,
          "Success Product Updated",
          result
        );
      } else {
        return helper.response(response, 404, `Product By Id: ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(response, 404, "Bad Request", error);
    }
  },
  deleteProduct: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await deleteProduct(id);
      console.log(result);
      return helper.response(response, 200, "Success Product Deleted", result);
    } catch (error) {
      return helper.response(response, 404, "Bad Request", error);
    }
  },
};
