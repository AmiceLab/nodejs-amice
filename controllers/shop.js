//const products = [];
const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getAddProduct = (req, res, next) => {
  console.log("This is 1. getAddProduct");
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  console.log("This is 2. postAddProduct");
  const product = new Product(req.body.title); //name is title in HTML
  product.save(); //will use the save method defined in Product model
  res.redirect("/");
  //res.render('shop', { pageTitle: 'Shop', prods: products, path: '/admin/add-product' });
};

// -- from shop.js. //get and show all products
exports.getProducts = (req, res, next) => {
  console.log("This is 3. getProducts");
  //const products = Product.fetchAll();
  // (products)=>{} is a cb, put "res.render" inside the cb, it will show when ready
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([product]) => {
      res.render("shop/product-detail", {
        product: product[0],
        pageTitle: product[0].Title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  console.log("This is 3. getProducts");
  //const products = Product.fetchAll();
  // (products)=>{} is a cb, put "res.render" inside the cb, it will show when ready
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    // because want to get more information regarding the cart
    Product.fetchAll((products) => {
      const cartProducts = []; ///<---- this is the target we store and pass to html
      // compare each product in Product DB but also in Cart
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id,
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  // find price of product
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  console.log(prodId);
  res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  console.log("Raw req.body:", req.body);
  const prodId = req.body.productId;
  console.log("prodId=", prodId);
  Product.findById(prodId, (product) => {
    if (!product) {
      console.log("Product not found for id:", prodId);
      return res.redirect("/cart"); // or show error page
    }
    console.log("product.price=", product.price);
    Cart.deleteProduct(prodId, product.price);

    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Ours",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTile: "Checkout",
  });
};
