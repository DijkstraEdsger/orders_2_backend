const express = require("express");
const cartAdminController = require("../controllers/admin-cart");
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post("/cart", isAuth, cartAdminController.addProductToCart);

// router.delete("/cart", cartAdminController.deleteProductFromCart);

module.exports = router;
