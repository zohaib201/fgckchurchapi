const http_status_codes = require('http-status-codes');


const {

    Question,
    Radio,
    Answer
} = require('../database/database');
module.exports = {

    async createQuestion(req, res, next) {
        try {
            const {
                statement,
                radios
            } = req.body;

            const question = await Question.create({
                statement: statement,
                numberAnswered: 0
            });

            const radiosFromDatabase = await radios.forEach(radio => {
                Radio.create({
                    statement: radio.statement,
                    questionId: question.id,
                    userAnswer: false,
                    numberAnswered: 0
                })
            });

            return res.status(http_status_codes.CREATED).json(question);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Question"
            });
        }
    },

    async answerToQuestion(req, res, next) {
        try {
            const {
                radioId,
                memberFromAppId,
                questionId
            } = req.body;

            const radioDb = await Radio.findOne({where: {id: radioId}}); 
            const isanswered = await Answer.findOne({where: {memberFromAppId: memberFromAppId}});

            if(isanswered){
                return res.json({message: 'You are not allowed to submit second time'});
            }else{
                const radio = await Radio.update({
                    userAnswer: true,
                    numberAnswered: radioDb.numberAnswered + 1
    
                }, {
                        where: {
                            id: radioId
                        }
                    });
                    
                    const questionDb = await Question.findOne({where: {id: questionId}}); 
            const question = await Question.update({
                userAnswer: true,
                numberAnswered: questionDb.numberAnswered + 1

            }, {
                    where: {
                        id: questionId
                    }
                });


                const answer = await Answer.create({
                    questionId: questionId,
                    radioId: radioId,
                    memberFromAppId: memberFromAppId
    
                });
                return res.status(http_status_codes.OK).json({
                    message: 'Answer Saved Successfully'
                });
            }
            
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Saving Answer"
            });
        }
    },


    async updateQuestion(req, res, next) {
        try {
            const {
                statement

            } = req.body;
            questionId = req.params.id;
            const question = await Question.update({
                statement: statement

            }, {
                    where: {
                        id: questionId
                    }
                });
            return res.status(http_status_codes.OK).json({
                message: 'Question Updated Successfully'
            });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating Question"
            });
        }
    },

    async getQuestion(req, res, next) {
        try {
            questionId = req.params.id;
            const question = await Question.findOne({ where: { id: questionId }, include: [{ model: Radio }] });
            return res.status(http_status_codes.OK).json(question);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching Question"
            });
        }
    },

    async getAllQuestions(req, res, next) {
        try {
            const question = await Question.findAll({ include: [{ model: Radio }] });
            return res.status(http_status_codes.OK).json(question);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Question"
            });
        }
    },


    async deleteQuestion(req, res, next) {
        try {
            questionId = req.params.id;
            const question = await Question.destroy({ where: { id: questionId } });
            return res.status(http_status_codes.OK).json({ message: 'question Deleted Successfully' });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting question"
            });
        }
    }

};