const routes = require("express").Router();

const product = require("./routes/product");
const category = require("./routes/category");
const history = require("./routes/history");
const purchase = require("./routes/purchase");
const users = require("./routes/users");

routes.use("/product", product);
routes.use("/category", category);
routes.use("/history", history);
routes.use("/purchase", purchase);
routes.use("/users", users);

module.exports = routes;
