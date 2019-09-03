var express = require('express');
var router = express.Router();
const prayerController = require('../controller/prayer');


router.post('/create/:id', prayerController.createPrayer );
router.post('/approve/:id', prayerController.approvePrayer );
// router.post('/signin', prayerController.signInMemberFromApp );
router.post('/update/:id', prayerController.updatePrayer );
router.delete('/delete/:id', prayerController.deletePrayer );
router.get('/get/:id', prayerController.getPrayer );
router.get('/getall', prayerController.getAllPrayers );
router.get('/getallapproved', prayerController.getAllApprovedPrayers );



module.exports = router;