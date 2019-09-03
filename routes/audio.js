var express = require('express');
var router = express.Router();
const audioController = require('../controller/audio');


router.post('/create', audioController.createAudio );
router.post('/update/:id', audioController.updateAudio );
router.delete('/delete/:id', audioController.deleteAudio );
router.get('/get/:id', audioController.getAudio );
router.get('/getall', audioController.getAllAudios );



module.exports = router;