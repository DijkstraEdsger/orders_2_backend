const express = require("express");

const userController = require("../controllers/admin-user");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

// router.get("/users", userController.getUsers);

// router.get("/users/:userId", userController.getUser);

// router.post("/users", userController.createUser);

// router.put("/users/:userId", userController.updateUser);

// router.delete("/users/:userId", userController.deleteUser);

module.exports = router;
