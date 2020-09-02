const routes = require("express").Router();
// import route disini
const product = require("./routes/product");
const category = require("./routes/category");
const history = require("./routes/history");
const purchase = require("./routes/purchase");
const users = require("./routes/users");

//buat middle disini
routes.use("/product", product);
routes.use("/category", category);
routes.use("/history", history);
routes.use("/purchase", purchase);
routes.use("/users", users);

module.exports = routes;
