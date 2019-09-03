var express = require('express');
var router = express.Router();
const videoController = require('../controller/video');


router.post('/create', videoController.createVideo );
router.post('/update/:id', videoController.updateVideo );
router.delete('/delete/:id', videoController.deleteVideo );
router.get('/get/:id', videoController.getVideo );
router.get('/getall', videoController.getAllVideos );



module.exports = router;