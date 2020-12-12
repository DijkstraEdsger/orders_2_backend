const User = require("../models/user");

exports.getUsers = (req, res, next) => {
  User.fetchAll()
    .then((users) => {
      res.status(200).json({ users: users });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found!" });
      }
      res.status(200).json({ user: user });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createUser = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const user = new User(name, email);

  user.save()
    .then((user) => {
      res
        .status(201)
        .json({ message: "User created succesfully!", user: user });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const name = req.body.name;
  const email = req.body.email;
  const user = new User(name, email, userId);

  user.save()
    .then((userUpdated) => {
      if (!userUpdated) {
        res.status(404).json({ message: "User not found!" });
      }

      res.status(200)
        .json({ message: "User updated succesfully", user: userUpdated });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;

  User.delete(userId)
    .then((user) => {
      res.status(200).json({ message: "User deleted succesfully!" });
    })
    .catch((err) => {
      console.log(err);
    });
};
