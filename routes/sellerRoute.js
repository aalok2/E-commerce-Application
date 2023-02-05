const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/sellerController");
const { validateToken } = require("../middlewares/tokenValidation");
router.get("/orders/:seller_id", validateToken, async (req, res) => {
  try {
    // reteiveing all sellers
    const seller_id = req.params.seller_id;
    if (!seller_id) {
      res.status(403).json({ message: "Send Mandatory Parameters" });
    }
    await sellerController.getOrderList(req, res);
  } catch (error) {
    res.status(400).json({ message: "No orders found" });
  }
});
router.post("/create-catalog/:seller_id", validateToken, async (req, res) => {
  try {
    // creating order
    const seller_id = req.params.seller_id;
    const productList = req.body.productList;
    if (!seller_id || !productList) {
      res.status(403).json({ message: "Send Mandatory Parameters" });
    }
    await sellerController.createCatalog(req, res);
  } catch (error) {
    res.status(400).json({ message: "Not able to create catalog" });
  }
});
module.exports = router;
