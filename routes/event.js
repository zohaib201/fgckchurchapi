var express = require('express');
var router = express.Router();
const eventController = require('../controller/event');


router.post('/create', eventController.createEvent );
router.post('/update/:id', eventController.updateEvent );
router.delete('/delete/:id', eventController.deleteEvent );
router.get('/get/:id', eventController.getEvent );
router.get('/getall', eventController.getAllEvents );



module.exports = router;