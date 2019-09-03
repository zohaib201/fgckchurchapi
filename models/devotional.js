module.exports = (sequelize, type) => {
    return sequelize.define("devotional", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      title: type.STRING,
      description: type.STRING,
      imageUrl: type.STRING
    });
  };
  