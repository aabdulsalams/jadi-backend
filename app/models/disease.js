module.exports = (sequelize, DataTypes) => {
  const Disease = sequelize.define('Disease', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    control: DataTypes.STRING,
    precautions: DataTypes.STRING,
  }, {
    createdAt: false,
    updatedAt: false,
  });
  Disease.associate = function (models) {
    Disease.hasMany(models.History, {
      foreignKey: 'disease_id',
      as: 'histories',
    });
    Disease.hasMany(models.DiseaseSuggestion, {
      foreignKey: 'disease_id',
      as: 'diseaseSuggestions',
    });
  };
  return Disease;
};
