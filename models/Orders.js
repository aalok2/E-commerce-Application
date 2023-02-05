module.exports = (sequelize, Sequelize) => {
  const Orders = sequelize.define("Orders", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    seller_id: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    buyers_id: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    productList: {
      type: Sequelize.TEXT,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  });
  // Orders.associate = function (models) {
  //   Orders.belongsTo(models.Sellers, {
  //     foreignKey: {
  //       name: "seller_id",
  //       as: "Sellers",
  //     },
  //   });
  // };
  // Orders.associate = function (models) {
  //   Orders.belongsTo(models.Buyers, {
  //     foreignKey: {
  //       name: "buyers_id",
  //       as: "Buyers",
  //     },
  //   });
  // };
  return Orders;
};
