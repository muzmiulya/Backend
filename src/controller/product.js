const {
  getProduct,
  getProductByName,
  getProductCount,
  getProductCountName,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct,
} = require("../model/product");
const qs = require("querystring");
const helper = require("../helper/index.js");
const redis = require("redis");
const fs = require("fs");
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
      const newResult = { result, pageInfo };
      client.setex(
        `getproductall:${JSON.stringify(request.query)}`,
        3600,
        JSON.stringify(newResult)
      );
      return helper.response(
        response,
        200,
        "Success Get Product",
        result,
        pageInfo
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getAllProductByName: async (request, response) => {
    let { search, page, limit } = request.query;
    if (search === undefined || search === null || search === "") {
      search = "%";
    } else {
      search = "%" + search + "%";
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
    let totalData = await getProductCountName(search);
    let totalPage = Math.ceil(totalData / limit);
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
      const result = await getProductByName(search, limit);
      client.setex(
        `getproductbyname:${JSON.stringify(request.query)}`,
        3600,
        JSON.stringify(result)
      );
      return helper.response(
        response,
        200,
        "Success Get Product Name",
        result,
        pageInfo
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getProductById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getProductById(id);
      if (result.length > 0) {
        client.setex(`getproductbyid:${id}`, 3600, JSON.stringify(result));
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
      const setData = {
        category_id: request.body.category_id,
        product_name: request.body.product_name,
        product_price: request.body.product_price,
        product_picture:
          request.file === undefined ? "noimage.png" : request.file.filename,
        product_created_at: new Date(),
        product_status: request.body.product_status,
      };

      const result = await postProduct(setData);
      return helper.response(response, 200, "Success Product Posted", result);
    } catch (error) {
      return helper.response(response, 404, "Bad Request", error);
    }
  },
  patchProduct: async (request, response) => {
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
      const { id } = request.params;
      const {
        category_id,
        product_name,
        product_price,
        product_status,
      } = request.body;
      const checkId = await getProductById(id);
      if (checkId.length > 0) {
        const setData = {
          category_id,
          product_name,
          product_price,
          product_picture: request.file,
          product_updated_at: new Date(),
          product_status,
        };
        if (checkId[0].product_picture === 'noimage.png') {
          if (request.file === undefined) {
            setData.product_picture = 'noimage.png'
          } else {
            setData.product_picture = request.file.filename
          }
          const result = await patchProduct(setData, id);
          return helper.response(
            response,
            200,
            "Success Product Updated",
            result
          );
        } else if (request.file === undefined) {
          setData.product_picture = checkId[0].product_picture
          const result = await patchProduct(setData, id);
          return helper.response(
            response,
            200,
            "Success Product Updated",
            result
          );
        } else {
          setData.product_picture = request.file.filename
          const path = `./uploads/${checkId[0].product_picture}`;
          fs.unlink(path, (error) => {
            if (error) {
              throw error
            }
          });
          const result = await patchProduct(setData, id);
          return helper.response(
            response,
            200,
            "Success Product Updated",
            result
          );
        }
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
      const getId = await getProductById(id);
      const getProductPicture = getId.map((value) => {
        return value.product_picture;
      });
      const justPicture = getProductPicture[0];
      const path = `./uploads/${justPicture}`;
      fs.unlink(path, (err) => {
        if (err) {
          return;
        }
      });
      const result = await deleteProduct(id);
      return helper.response(response, 200, "Success Product Deleted", result);
    } catch (error) {
      return helper.response(response, 404, "Bad Request", error);
    }
  },
};
