module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {});
  User.associate = function (models) {
    User.belongsToMany(models.Role, {
      through: 'user_roles',
      foreignKey: 'userId',
      otherKey: 'roleId',
    });

    User.hasMany(models.History, {
      foreignKey: 'user_id',
      as: 'histories',
    });
  };
  return User;
};
