// const Cart = require("../models/cart");
const Product = require("../models/product");
const User = require("../models/user");
const { updateUser } = require("./admin-user");

exports.getCart = (req, res, next) => {
  User.findByPk(req.userId)
    .then((user) => {
      user
        .getCart()
        .then((cart) => {
          return cart
            .getProducts()
            .then((products) => {
              res.status(200).json({ cart: products });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addProductToCart = async (req, res, next) => {
  const productId = req.body.productId;
  // temp
  req.loggedUser.name = 'John';
  // temp
  try {
    let productFetched = await Product.findById(productId);
    // let userUpdated = await User.findById(req.loggedUser._id);
    // let userUpdated = await req.loggedUser.save();
    // console.log('ooooooooooo', userUpdated);
    // updateUser.name = 'John';
    // await userUpdated.save();
    await req.loggedUser.addToCart(productFetched);
    console.log('Product added to the cart succesfully!');
    res.json(201, {
      message: "Product added to the cart succesfully!",
      cart: req.loggedUser.cart,
    })
  } catch (error) {
    console.log(error);
  }
  // const quantity = req.body.quantity;
  // let fetchedCart;

  // User.findByPk(req.userId)
  //   .then((user) => {
  //     user
  //       .getCart()
  //       .then((cart) => {
  //         fetchedCart = cart;
  //         cart
  //           .getProducts({ where: { id: productId } })
  //           .then((products) => {
  //             let product;
  //             if (products.length > 0) {
  //               product = products[0];
  //             }
  //             if (product) {
  //               return product;
  //             }
  //             return Product.findByPk(productId);
  //           })
  //           .then((product) => {
  //             return fetchedCart.addProduct(product, {
  //               through: { quantity: quantity },
  //             });
  //           })
  //           .then((result) => {
  //             res
  //               .status(200)
  //               .json({ message: "Product added to cart succesfully!" });
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.deleteProductFromCart = (req, res, next) => {
  const productId = req.body.productId;

  User.findByPk(req.userId)
    .then((user) => {
      req.user
        .getCart()
        .then((cart) => {
          return cart.getProducts({ where: { id: productId } });
        })
        .then((products) => {
          const product = products[0];
          return product.cartItem.destroy();
        })
        .then((result) => {
          res
            .status(200)
            .json({ message: "Product deleted from cart siccesfully!" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
