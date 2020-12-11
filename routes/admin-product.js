const express = require("express");

const productController = require("../controllers/admin-product");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/product", productController.getProducts);

router.get("/product/:productId", isAuth, productController.getProduct);

router.post("/product", productController.createProduct);

router.put("/product/:productId", isAuth, productController.updateProduct);

router.delete("/product/:productId", isAuth, productController.deleteProduct);

module.exports = router;
