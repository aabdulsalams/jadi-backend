module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Diseases', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Diseases');
  },
};
