// const Order = require("../models/order");
const Product = require("../models/product");
// const Cart = require("../models/cart");
const User = require("../models/user");

exports.createOrder = async (req, res, next) => {
  await req.loggedUser.addOrder();
  res.status(201).json({ message: "Order created succesfully!" });
  // let fetchedCart;
  // const user = await User.findByPk(req.userId);
  // user
  //   .getCart()
  //   .then((cart) => {
  //     fetchedCart = cart;
  //     return cart.getProducts();
  //   })
  //   .then((products) => {
  //     return user
  //       .createOrder()
  //       .then((order) => {
  //         return order.addProducts(
  //           products.map((product) => {
  //             product.orderItem = { quantity: product.cartItem.quantity };
  //             return product;
  //           })
  //         );
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   })
  //   .then((result) => {
  //     return fetchedCart.setProducts(null);
  //   })
  //   .then((result) => {
  //     res.status(201).json({ message: "Order created succesfully!" });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.getOrders = async (req, res, next) => {
  let orders = await req.loggedUser.getOrders();
  res.status(200).json({ orders: orders });
};
