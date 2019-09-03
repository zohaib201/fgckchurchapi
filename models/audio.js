module.exports = (sequelize, type) => {
    return sequelize.define("audio", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      imageUrl: type.STRING,
      description: type.STRING,
      audioUrl: type.STRING
    });
  };
  