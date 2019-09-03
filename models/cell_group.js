module.exports = (sequelize, type) => {
    return sequelize.define("cell_group", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      cellGroupDetail: type.STRING
    });
  };
  