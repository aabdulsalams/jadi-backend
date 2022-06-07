module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    user_id: DataTypes.STRING,
    disease_id: DataTypes.STRING,
    image_url: DataTypes.STRING,
    scan_date: DataTypes.DATE,
  }, {
    createdAt: false,
    updatedAt: false,
  });
  History.associate = function (models) {
    History.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    History.belongsTo(models.Disease, {
      foreignKey: 'disease_id',
      as: 'disease',
    });
  };
  return History;
};
