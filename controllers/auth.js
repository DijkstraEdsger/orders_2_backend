const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  try {
    const hashedPw = await bcryptjs.hash(password, 12);
    const user = new User(name, email, hashedPw);
    const userCreated = await user.save();
    // await user.createCart();
    res.status(201).json({ message: "User created successfully!", user: user });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;

  try {
    const user = await User.findByEmail(email);

    const isEqual = await bcryptjs.compare(password, user.password);

    if (!isEqual) {
      res.status(401).json({ message: "Wrong password!" });
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token: token, userId: user.id });
  } catch (error) {
    console.log(error);
  }
};
