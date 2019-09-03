module.exports = (sequelize, type) => {
    return sequelize.define("notification", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      title: type.STRING,
      description: type.STRING
    });
  };
  