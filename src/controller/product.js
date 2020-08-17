const {
  getProduct,
  getProductCount,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct,

} = require("../model/product");
const qs = require('querystring')
const helper = require("../helper/index.js");
const { request } = require("express");

const getPrevLink = (page, currentQuery) => {
  if (page > 1) {
    const generatedPage = {
      page: page - 1
    }
    const resultPrevLink = { ...currentQuery, ...generatedPage }
    return qs.stringify(resultPrevLink)
  } else {
    return null
  }
}

const getNextLink = (page, totalPage, currentQuery) => {
  if (page < totalPage) {
    const generatedPage = {
      page: page + 1
    }
    const resultNextLink = { ...currentQuery, ...generatedPage }
    return qs.stringify(resultNextLink)
  } else {
    return null
  }
}

module.exports = {
  getAllProduct: async (request, response) => {

    let { search, sort, page, limit } = request.query


    if (search === undefined || search === null || search === '') {
      search = '%'
    } else {
      search = search + "%"
    }
    if (sort === undefined || sort === null || sort === '') {
      sort = `CURRENT_TIMESTAMP`
    }
    if (page === undefined || page === null || page === '') {
      page = parseInt(1)
    } else {
      page = parseInt(page)
    }
    if (limit === undefined || limit === null || limit === '') {
      limit = parseInt(100)
    } else {
      limit = parseInt(limit)
    }
    let totalData = await getProductCount()
    let totalPage = Math.ceil(totalData / limit)
    let limits = page * limit
    let offset = page * limit - limit
    let prevLink = getPrevLink(page, request.query)
    let nextLink = getNextLink(page, totalPage, request.query)

    const pageInfo = {
      page,
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3001/product?${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3001/product?${nextLink}`

    }
    try {
      const result = await getProduct(search, sort, limit, offset)
      return helper.response(response, 200, "Success Get Product", result, pageInfo);
      // console.log(result, pageInfo)
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
      // console.log(error)
    }
  },
  getProductById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getProductById(id);
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
    try {
      const setData = {
        category_id: request.body.category_id,
        product_name: request.body.product_name,
        product_price: request.body.product_price,
        product_picture: request.body.product_picture,
        product_created_at: new Date(),
        product_status: request.body.product_status,
      };
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
