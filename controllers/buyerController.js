const models = require("../models");
const getSellerList = async (req, res) => {
  try {
    const sellersList = await models.Sellers.findAll({
      where: {},
      json: true,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return res.status(200).json({ sellers: sellersList, success: 1 });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving Sellers", success: 0 });
  }
};
const getSellerById = async (req, res) => {
  try {
    const seller_id = req.params.seller_id;
    const productList = await models.Products.findAll({
      where: {
        seller_id: seller_id,
        available: 1,
      },
      json: true,
      attributes: ["Product_id", "Name", "Price", "seller_id"],
    });
    if (productList.length)
      return res.status(200).json({ products: productList, success: 1 });
    else
      return res
        .status(200)
        .json({ message: "No active products for seller", success: 1 });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving Seller with id", success: 0 });
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
    return res
      .status(201)
      .json({ message: "Order Created Succesfully", success: 1 });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating order, please try again", success: 0 });
  }
};
module.exports = {
  getSellerList,
  getSellerById,
  createOrder,
};
