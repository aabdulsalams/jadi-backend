module.exports = (sequelize, DataTypes) => {
  const Disease = sequelize.define('Disease', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
  }, {
    createdAt: false,
    updatedAt: false,
  });
  Disease.associate = function (models) {
    Disease.hasMany(models.History, {
      foreignKey: 'disease_id',
      as: 'histories',
    });
  };
  return Disease;
};
