const express = require("express");
// const compression = require('compression');
const path = require("path");

const bodyParser = require("body-parser");
const mongoConnect = require('./util/database').mongoConnect;



const adminProductRoutes = require("./routes/admin-product");
// const adminUserRoutes = require("./routes/admin-user");
// const adminCartRoutes = require("./routes/admin-cart");
// const adminOrderRoutes = require("./routes/admin-order");
// const cartRoutes = require("./routes/cart");
// const orderRouter = require("./routes/order");
// const authRouter = require("./routes/auth");
// const adminImageRoutes = require("./routes/admin-image");
// const heroRoutes = require("./routes/hero");

const app = express();

// app.use(compression());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(bodyParser.json({ limit: "50mb" }));

app.use("/public", express.static(path.join(__dirname, "public")));

// app.use(express.static(__dirname+'/public'));
// app.use(multer({ dest: "public/images" }).single("file"));

app.use("/admin", adminProductRoutes);
// app.use("/admin", adminUserRoutes);
// app.use("/admin", adminCartRoutes);
// app.use("/admin", adminOrderRoutes);
// app.use("/shop", cartRoutes);
// app.use("/shop", orderRouter);
// app.use("/auth", authRouter);
// app.use("/admin", adminImageRoutes);
// app.use("/admin", heroRoutes);

mongoConnect(() => {
  app.listen(8080);
})