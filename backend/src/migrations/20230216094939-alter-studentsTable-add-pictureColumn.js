'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.addColumn(
        'Students', 'picture',
        {
          type: Sequelize.DataTypes.STRING,
          unique: true,
          allowNull: true
        },
        { transaction }
      )
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.removeColumn('Students', 'picture', { transaction })
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};
