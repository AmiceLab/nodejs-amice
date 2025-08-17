const path = require("path");
const express = require("express");
const shopController = require("../controllers/shop");

const router = express.Router();

// use "get" instead of "use", to avoid arbitary link
router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);
// router.get('/products/delete'); eg. only
router.get("/products/:productId", shopController.getProduct); //becuase :productId can be any number, avoid delete request go into it

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.post("/cart-delete-item", shopController.postCartDeleteProduct);

router.get("/orders", shopController.getOrders);

router.get("/checkout", shopController.getCheckout);
module.exports = router;
