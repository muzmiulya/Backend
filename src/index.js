const routes = require("express").Router();
// import route disini
const product = require("./routes/product");
const category = require("./routes/category");
const history = require("./routes/history");

//buat middle disini
routes.use("/product", product);
routes.use("/category", category);
routes.use("/history", history);

module.exports = routes;
