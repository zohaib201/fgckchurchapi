var express = require('express');
var router = express.Router();
const notificationController = require('../controller/notification');


router.post('/create', notificationController.createNotifiction );
router.post('/update/:id', notificationController.updateNotifiction );
router.delete('/delete/:id', notificationController.deleteNotifiction );
router.get('/get/:id', notificationController.getNotifiction );
router.get('/getall', notificationController.getAllNotifictions );



module.exports = router;