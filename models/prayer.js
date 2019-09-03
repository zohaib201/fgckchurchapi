module.exports = (sequelize, type) => {
    return sequelize.define("prayer", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      description: type.STRING,
      isApproved: type.BOOLEAN,
      memberName: type.STRING,
      whatsapp: type.STRING,
      email: type.STRING
    });
  };
  