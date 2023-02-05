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
    return res.status(200).json(orderList);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving orderList with id" });
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
      res.status(201).json({ message: "Catalog Created Succesfully" });
    }
    return products;
  } catch (error) {
    return res.status(500).json({ message: "Error creating product list." });
  }
};
module.exports = {
  getOrderList,
  createCatalog,
};
