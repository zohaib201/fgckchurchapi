module.exports = (sequelize, type) => {
    return sequelize.define("member_from_app", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      name: type.STRING,
      email: type.STRING,
      password: type.STRING,
      phno: type.STRING,
      isApproved: type.BOOLEAN,
      isBlocked: type.BOOLEAN,
      isPasswordChanged: type.BOOLEAN,
      notificationToken: type.STRING, 
      vCode: {
        type: type.STRING, 
        defaultValue: null
      }
    });
  };
  