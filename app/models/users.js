

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("details", {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.ENUM,
      values: ['male', 'female', 'other']
    },
    hobbies: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.TEXT
    },
    pincode: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    date:{
      type: Sequelize.DATE
    }
  });

  return User;
};
