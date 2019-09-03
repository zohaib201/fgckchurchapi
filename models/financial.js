module.exports = (sequelize, type) => {
    return sequelize.define("financial", {
      id: { 
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      amount: type.INTEGER,
      description: type.STRING,
      date: type.STRING
    });
  };
  