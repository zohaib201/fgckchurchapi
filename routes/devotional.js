var express = require('express');
var router = express.Router();
const devotionalController = require('../controller/devotional');


router.post('/create', devotionalController.createDevotional );
router.post('/update/:id', devotionalController.updateDevotional );
router.delete('/delete/:id', devotionalController.deleteDevotional );
router.get('/get/:id', devotionalController.getDevotional );
router.get('/getall', devotionalController.getAllDevotionals );



module.exports = router;