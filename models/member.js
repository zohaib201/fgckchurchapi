module.exports = (sequelize, type) => {
    return sequelize.define("member", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      name: type.STRING,
      spouse: type.STRING,
      landline_kuwait: type.STRING,
      primary_whatsapp: type.STRING,
      mobile1_kuwait: type.STRING,
      mobile2_kuwait: type.STRING,
      landline_international: type.STRING,
      mobile1_international: type.STRING,
      mobile2_international: type.STRING,
      email_id1: type.STRING,
      email_id2: type.STRING, 
      family_photo: type.STRING,
      isApproved: type.BOOLEAN,
      isBlocked: type.BOOLEAN,
      address: type.STRING
    });
  };
  