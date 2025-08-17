// app.js
"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");

// database
const errorController = require("./controllers/error");
const db = require("./util/database");

const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");

// database
db.execute("SELECT * FROM products")
  .then((result) => {
    console.log(result[0]);
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

//register middleware - body-parser
app.use(bodyParser.urlencoded({ extended: false })); // passing the body to /product
app.use(express.static(path.join(__dirname, "public"))); // enter public folder

app.use("/admin", adminRoutes); // because has routes and products
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
