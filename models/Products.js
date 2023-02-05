module.exports = (sequelize, Sequelize) => {
  const Products = sequelize.define("Products", {
    Product_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: Sequelize.STRING,
    },
    Price: {
      type: Sequelize.INTEGER,
    },
    available: {
      type: Sequelize.INTEGER,
      default: 1,
    },
    seller_id: {
      type: Sequelize.INTEGER,
      foreignKey: true,
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
  // Products.associate = function (models) {
  //   Products.belongsTo(models.Sellers, {
  //     foreignKey: {
  //       name: "seller_id",
  //       as: "Sellers",
  //     },
  //   });
  // };
  return Products;
};
