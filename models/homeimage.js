module.exports = (sequelize, type) => {
    return sequelize.define("homeimage", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      home_img: type.STRING,
    });
  };
  