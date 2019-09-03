var express = require('express');
var router = express.Router();
const memberFromAppController = require('../controller/member_from_app');
const hashedPassword = require("password-hash");
const { MemberFromApp} = require('../database/database');


router.post('/create', memberFromAppController.signUpMemberFromApp);
router.post('/approve/:id', memberFromAppController.approveMemberFromApp);
router.post('/signin', memberFromAppController.signInMemberFromApp);
router.get('/get/:id', memberFromAppController.getMemberFromApp);
router.get('/getall', memberFromAppController.getAllMembersFromApp);
router.get('/getallapproved', memberFromAppController.getAllApprovedMembersFromApp);
router.delete('/delete', memberFromAppController.deletefromapp);
router.post("/updateNotifyToken", memberFromAppController.updateNotifyTokern);

router.post("/resetpassword/:id", (req, res, next) => {

    const reqUserId = req.params.id;
    const reqOldPasswored = req.body.oldPassword;
    const reqNewPassword = req.body.newPassword;


    MemberFromApp.findOne({
        where: { id: reqUserId }
    })
        .then((fetchedUser) => {
            const isAuth = hashedPassword.verify(
                reqOldPasswored,
                fetchedUser.password
            );
            if (isAuth) {
                fetchedUser.update({
                    password: hashedPassword.generate(reqNewPassword),
                    isPasswordChanged: true
                })
                    .then(() => {
                        res.json({ message: 'OK' });
                    })
            } else if (!isAuth) {
                res.json({ message: 'NotOk' });
            }
        })

});




module.exports = router;