const models = require("../models");
const getOrderList = async (req, res) => {
  try {
    const seller_id = req.params.seller_id;
    const orderList = await models.Orders.findAll({
      where: {
        seller_id: seller_id,
      },
      json: true,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return res.status(200).json({ orders: orderList, success: 1 });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving orderList with id", success: 0 });
  }
};
const createCatalog = async (req, res) => {
  try {
    const seller_id = req.params.seller_id;
    const productList = req.body.productList;
    for (let index in productList) {
      let productData = {
        seller_id: seller_id,
        Name: productList[index].Name,
        Price: productList[index].Price,
      };
      await models.Products.create(productData);
      res
        .status(201)
        .json({ message: "Catalog Created Succesfully", success: 1 });
    }
    return products;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating product list.", success: 0 });
  }
};
module.exports = {
  getOrderList,
  createCatalog,
};
