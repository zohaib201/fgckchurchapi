module.exports = (sequelize, type) => {
    return sequelize.define("incharge", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      name: type.STRING,
      description: type.STRING, 
      photo: type.STRING,
     
    });
  };
  