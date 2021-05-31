

module.exports = (sequelize, Sequelize) => {
    const AuthUser = sequelize.define("authuser", {
      fname: {
        type: Sequelize.STRING
      },
      lname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
     
    });
  
    return AuthUser;
  };
  