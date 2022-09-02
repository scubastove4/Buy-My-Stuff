'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'first_name'
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      passwordDigest: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'password_digest'
      },
      isAdmin: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'is_admin',
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('customers', { restartIdentity: true })
  }
}
