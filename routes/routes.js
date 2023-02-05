const express = require("express");
const router = express.Router();
const authRouter = require("../routes/authRoute");
const buyersRouter = require("../routes/buyerRoute");
const sellersRouter = require("../routes/sellerRoute");
//  Routing all apis
router.use("/auth", authRouter);
router.use("/buyer", buyersRouter);
router.use("/seller", sellersRouter);
module.exports = router;
