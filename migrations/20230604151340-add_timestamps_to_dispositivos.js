'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('dispositivos', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.addColumn('dispositivos', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('dispositivos', 'createdAt');
    await queryInterface.removeColumn('dispositivos', 'updatedAt');
  },
};

 
