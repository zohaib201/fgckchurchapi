var express = require('express');
var router = express.Router();
const memberController = require('../controller/member');
const auth = require('../controller/auth');


router.post('/create/:id', memberController.createMember );
router.post('/block/:id', memberController.blockMember );
router.post('/unblock/:id', memberController.unBlockMember );

router.post('/blockf/:id', memberController.blockMemberf );
router.post('/unblockf/:id', memberController.unBlockMemberf );
// router.post('/signin', memberController.signInMemberFromApp );
router.post('/update/:id', memberController.updateMember );
router.post('/delete/:id', memberController.deleteMember );
router.get('/get/:id', memberController.getMember );
router.get('/getByMemberFromApp/:id', memberController.getMemberByMemberFromAppId );
router.get('/getall', memberController.getAllMembers );
router.post('/resetPasswordRequest', auth.resetPasswordRequest );
router.post("/resetPasswordValidate", auth.resetPasswordValidate);
router.post("/resetPassword/:id",auth.resetPassword);

router.post("/inchargecreate",memberController.createincharge);
router.get("/getallincharge",memberController.getallincharge);
router.delete("/delincharge/:id",memberController.delincharge);

router.post("/homephoto",memberController.addhomephoto);
router.delete("/photodel/:id",memberController.deletephoto);
router.get("/getallimgphoto",memberController.getallphotos);


module.exports = router;

