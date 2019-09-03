module.exports = (sequelize, type) => {
    return sequelize.define("answer", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      answer: type.STRING
    });
  };
  