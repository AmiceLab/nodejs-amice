//const products = [];
// Amice Wong

const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  console.log("This is 1. getAddProduct");
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  console.log("This is 2. postAddProduct");
  const title = req.body.title; //name is title in HTML
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, price, description); // null: Id
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err)); //will use the save method defined in Product model

  //res.render('shop', { pageTitle: 'Shop', prods: products, path: '/admin/add-product' });
};

// when show form to user (after receiving)
exports.getEditProduct = (req, res, next) => {
  console.log("~~ Get Edit Product ~~~");
  // check for the query parament namely "edit" from the inputing URL
  const editMode = req.query.edit; // "true" if yes
  console.log("editMode =", editMode);
  console.log("editMode =", typeof editMode);
  // !"true"
  if (editMode != "True") {
    console.log("~~~ See?");
    return res.redirect("/");
  }
  const prodId = req.params.productId; // get from Url

  exports.postEditProduct = (req, res, next) => {};

  Product.findById(prodId, (product) => {
    console.log("inside call back");
    // call back
    if (!product) {
      // if undefinited
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true, // then can share the same html.   e.g admin/edit-product/12345?edit=true&tile=xxx <--- query parameters
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId; // got from html hidden form
  const updatedTitle = req.body.title; //name is title in HTML
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product( // will go to --> "if (this.id) {" in the model to update instead of add
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDescription,
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  console.log("This is 3. getProducts");
  //const products = Product.fetchAll();
  // (products)=>{} is a cb, put "res.render" inside the cb, it will show when ready
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("admin/products", {
        prods: rows,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect("/admin/products");
};
