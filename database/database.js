const Sequelize = require('sequelize');

// MODELS


const UserModel = require("../models/user");
const CellGroupModel = require("../models/cell_group");
const MemberModel = require("../models/member");
const MemberFromAppModel = require("../models/member_from_app");
const ChildModel = require("../models/child");
const GrandChildModel = require("../models/grand_child");
const PrayerModel = require("../models/prayer");
const QuestionModel = require("../models/question");
const AnswerModel = require("../models/answer");
const RadioModel = require("../models/radio");
const VideoModel = require("../models/video");
const AudioModel = require("../models/audio");
const DevotionalModel = require("../models/devotional");
const EventModel = require("../models/event");
const NotificationModel = require("../models/notification");
const FinancialModel = require("../models/financial");
const homeimgModel = require("../models/homeimage");
const inchargemodel = require("../models/incharge");



// SEQUELIZE CONNECTION
//  zohaib201
// "GMYgifiOQw", "GMYgifiOQw", "4YKvznl2I8",
const sequelize = new Sequelize("GMYgifiOQw", "GMYgifiOQw", "4YKvznl2I8", {
    // host: "localhost",
    host: "remotemysql.com",
    dialect: "mysql",
    // operatorsAliases: false,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// MODELS CREATIONS WITH SWQUELIZE

const User = UserModel(sequelize, Sequelize);
const CellGroup = CellGroupModel(sequelize, Sequelize);
const Member = MemberModel(sequelize, Sequelize);
const MemberFromApp = MemberFromAppModel(sequelize, Sequelize);
const Child = ChildModel(sequelize, Sequelize);
const GrandChild = GrandChildModel(sequelize, Sequelize);
const Prayer = PrayerModel(sequelize, Sequelize);
const Question = QuestionModel(sequelize, Sequelize);
const Answer = AnswerModel(sequelize, Sequelize);
const Radio = RadioModel(sequelize, Sequelize);
const Video = VideoModel(sequelize, Sequelize);
const Audio = AudioModel(sequelize, Sequelize);
const Devotional = DevotionalModel(sequelize, Sequelize);
const Event = EventModel(sequelize, Sequelize);
const Notification = NotificationModel(sequelize, Sequelize);
const Financial = FinancialModel(sequelize, Sequelize);
const homeimage = homeimgModel(sequelize, Sequelize);
const incharge = inchargemodel(sequelize, Sequelize);





//  RELATIONS


Member.belongsTo(MemberFromApp);
MemberFromApp.hasMany(Member, { foreignKey: 'memberFromAppId', sourceKey: 'id' });

Member.belongsTo(CellGroup);
CellGroup.hasMany(Member, { foreignKey: 'cellGroupId', sourceKey: 'id' });

Child.belongsTo(Member);
Member.hasMany(Child, { foreignKey: 'memberId', sourceKey: 'id' });

GrandChild.belongsTo(Member);
Member.hasMany(GrandChild, { foreignKey: 'memberId', sourceKey: 'id' });

Prayer.belongsTo(MemberFromApp);
MemberFromApp.hasMany(Prayer, { foreignKey: 'memberFromAppId', sourceKey: 'id' });

Answer.belongsTo(Question);
Question.hasMany(Answer, { foreignKey: 'questionId', sourceKey: 'id' });

Radio.belongsTo(Question);
Question.hasMany(Radio, { foreignKey: 'questionId', sourceKey: 'id' });

Answer.belongsTo(Question);
Question.hasMany(Answer, { foreignKey: 'questionId', sourceKey: 'id' });

Answer.belongsTo(Radio);
Radio.hasMany(Answer, { foreignKey: 'radioId', sourceKey: 'id' });

Answer.belongsTo(MemberFromApp);
MemberFromApp.hasMany(Answer, { foreignKey: 'memberFromAppId', sourceKey: 'id' });

Financial.belongsTo(MemberFromApp);
MemberFromApp.hasMany(Financial, { foreignKey: 'memberFromAppId', sourceKey: 'id' });










// TO UPDATE SCHEMA

// sequelize.sync({ alter: true }).then(() => {
//     console.log(`Database & tables created!`);
// });



// EXPORT MODELS

module.exports = {

    User,    
    CellGroup,
    Member,
    MemberFromApp,
    Child,
    GrandChild,
    Prayer,
    Question,
    Answer,
    Radio,
    Video,
    Audio,
    Devotional,
    Event,
    Notification,
    Financial,
    homeimage,
    incharge

}; 