module.exports = (sequelize, type) => {
  return sequelize.define("question", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      required: true
    },
    statement: type.STRING,
    numberAnswered: type.INTEGER
  });
};


