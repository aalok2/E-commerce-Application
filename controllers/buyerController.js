const models = require("../models");
const getSellerList = async (req, res) => {
  try {
    const sellersList = await models.Sellers.findAll({
      where: {},
      json: true,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return res.status(200).json(sellersList);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving Sellers" });
  }
};
const getSellerById = async (req, res) => {
  try {
    const seller_id = req.params.seller_id;
    const sellerList = await models.Products.findAll({
      where: {
        seller_id: seller_id,
        available: 1,
      },
      json: true,
      attributes: ["Product_id", "Name", "Price", "seller_id"],
    });
    if (sellerList.length) return res.status(200).json(sellerList);
    else
      return res.status(200).json({ message: "No active products for seller" });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving Seller with id" });
  }
};
const createOrder = async (req, res) => {
  try {
    const orderData = {
      seller_id: req.params.seller_id,
      buyers_id: req.body.buyers_id,
      price: req.body.cartValue,
      productList: JSON.stringify(req.body.productList),
    };
    await models.Orders.create(orderData);
    return res.status(201).json({ message: "Order Created Succesfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating order, please try again" });
  }
};
module.exports = {
  getSellerList,
  getSellerById,
  createOrder,
};
