'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('carts', 'quantity', {
      type: Sequelize.INTEGER,
      defaultValue: 1
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('carts', 'quantity', {
      type: Sequelize.INTEGER
    })
  }
}
