module.exports = (sequelize, DataTypes) => {
  const DiseaseSuggestion = sequelize.define('DiseaseSuggestion', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    disease_id: DataTypes.STRING,
    suggestion: DataTypes.TEXT,
  }, {
    createdAt: false,
    updatedAt: false,
  });
  DiseaseSuggestion.associate = function (models) {
    DiseaseSuggestion.belongsTo(models.Disease, {
      foreignKey: 'disease_id',
      as: 'disease',
    });
  };
  return DiseaseSuggestion;
};
