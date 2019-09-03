var express = require('express');
var router = express.Router();
const questionController = require('../controller/question');


router.post('/create', questionController.createQuestion );
router.post('/update/:id', questionController.updateQuestion );
router.delete('/delete/:id', questionController.deleteQuestion );
router.get('/get/:id', questionController.getQuestion );
router.get('/getall', questionController.getAllQuestions );
router.post('/answer', questionController.answerToQuestion );



module.exports = router;