module.exports = (sequelize, type) => {
    return sequelize.define("user", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            required: true
        },
        userName: type.STRING,
        email: type.STRING,
        password: type.STRING,
        imageUrl: type.STRING,
    });
};