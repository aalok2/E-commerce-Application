const express = require("express");
const router = express.Router();
const buyerController = require("../controllers/buyerController");
const { validateToken } = require("../middlewares/tokenValidation");
router.get("/list-of-sellers", async (req, res) => {
  try {
    // reteiveing all sellers
    await buyerController.getSellerList(req, res);
  } catch (error) {
    res.status(404).json({ message: "No sellers found" });
  }
});
router.get("/seller-catalog/:seller_id", validateToken, async (req, res) => {
  try {
    // reteiveing by seller id
    const seller_id = req.params.seller_id;
    if (!seller_id) {
      res.status(401).json({ message: "Send Mandatory Parameters" });
    }
    await buyerController.getSellerById(req, res);
  } catch (error) {
    res.status(404).json({ message: "No sellers found" });
  }
});
router.post("/create-order/:seller_id", validateToken, async (req, res) => {
  try {
    // creating order
    const seller_id = req.params.seller_id;
    const buyers_id = req.body.buyers_id;
    if (!seller_id || !buyers_id) {
      res.status(401).json({ message: "Send Mandatory Parameters" });
    }
    await buyerController.createOrder(req, res);
  } catch (error) {
    res.status(404).json({ message: "Not able to create order" });
  }
});
module.exports = router;
