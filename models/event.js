module.exports = (sequelize, type) => {
    return sequelize.define("event", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      title: type.STRING,
      description: type.STRING,
      date: type.STRING
    });
  };
  