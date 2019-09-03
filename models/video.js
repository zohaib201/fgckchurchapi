module.exports = (sequelize, type) => {
    return sequelize.define("video", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      imageUrl: type.STRING,
      description: type.STRING,
      videoUrl: type.STRING
    });
  };
  