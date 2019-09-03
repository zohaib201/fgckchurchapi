module.exports = (sequelize, type) => {
    return sequelize.define("radio", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      statement: type.STRING,
      // userAnswer: type.BOOLEAN,
      numberAnswered: type.INTEGER
    });
  };
  
  
  