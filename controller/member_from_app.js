const http_status_codes = require('http-status-codes');
const jwt = require("jsonwebtoken");
const {

    MemberFromApp,
    Member
} = require('../database/database');
const hashedPassword = require("password-hash");

module.exports = {

    async signUpMemberFromApp(req, res, next) {
        try {
            const {
                name,
                email,
                password,
                phno,
                notificationToken
            } = req.body;

            MemberFromApp.findOne({
                where: {
                    email: email
                }
            }).then(isMemberFromAppExists => {
                if (isMemberFromAppExists) {
                    res.json({ message: "Email is already taken! Please choose another one" });
                } else {
                    MemberFromApp.create({
                        name: name,
                        email: email,
                        password: hashedPassword.generate(password),
                        phno: phno,
                        isApproved: false,
                        isBlocked: false,
                        isPasswordChanged: false,
                        notificationToken: notificationToken
                    })
                        .then((memberFromApp) => {
                            res.json(memberFromApp);
                        })
                }
            });
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating MemberFromApp"
            });
        }
    },

    async updateNotifyTokern( req, res, next){
        const {email, notificationToken} = req.body;
        MemberFromApp.update({
            notificationToken: notificationToken	
        }, {
            where: {
                email: email
            }
        }).then(uMember =>{
                res.json({msg: "token updated", success:true}).status(200);
        }).catch(err => {
            res.json({msg: "token not updated", success:false}).status(500);

        })
    },
    async signInMemberFromApp(req, res, next) {
        try {
            const {
                email,
                password,
                
            } = req.body;

            MemberFromApp.findOne({
                where: {
                    email: email
                }
            }).then(isMemberFromAppExists => {

                if (isMemberFromAppExists) {

                    const isAuth = hashedPassword.verify(
                        password,
                        isMemberFromAppExists.password
                    );
                    if (isAuth) {

                        if (isMemberFromAppExists.isApproved === true) {

                           if (isMemberFromAppExists.isPasswordChanged === true) {

                            const token = jwt.sign({
                                email: email,
                                userId: isMemberFromAppExists.id
                            },
                                "very-long-string-for-secret", {
                                    expiresIn: 3000
                                }
                            );

                            const member =  Member.findOne({ where: { memberFromAppId: isMemberFromAppExists.id } });

                            return res.status(200).json({
                                token: token,
                                expiresIn: 3000,
                                memID: isMemberFromAppExists.id
                            });

                           } else {
                               res.json({
                                message: "changepassword",
                                memberFromAppId: isMemberFromAppExists.id

                            });
                           }

                        } else {
                            res.json({
                                message: "Approval Pending"
                            });

                        }

                    } else {
                        res.json({
                            message: "Not Authorized"
                        });
                    }
                } else {
                    res.json({
                        message: "Not Authorized"
                    });

                }
            });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Signin"
            });
        }
    },


    async approveMemberFromApp(req, res, next) {
        try {
            memberFromAppId = req.params.id;
            const memberFromApp = await MemberFromApp.update({
                isApproved: true
            }, {
                    where: {
                        id: memberFromAppId
                    }
                });
            return res.status(http_status_codes.OK).json({
                message: 'MemberFromApp Approved Successfully'
            });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Approving MemberFromApp"
            });
        }
    },



    async getMemberFromApp(req, res, next) {
        try {
            memberFromAppId = req.params.id;
            const memberFromApp = await MemberFromApp.findOne({ where: { id: memberFromAppId } });
            return res.status(http_status_codes.OK).json(memberFromApp);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching MemberFromApp"
            });
        }
    },

    async getAllMembersFromApp(req, res, next) {
        try {
            const membersFromApp = await MemberFromApp.findAll();
            return res.status(http_status_codes.OK).json(membersFromApp);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All MembersFromApp"
            });
        }
    },

    async getAllApprovedMembersFromApp(req, res, next) {
        try {
            const membersFromApp = await MemberFromApp.findAll({ where: { isApproved: true } });
            return res.status(http_status_codes.OK).json(membersFromApp);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching AllApprovedMembersFromApp"
            });
        }
    },


    async deletefromapp(req, res, next) {
        try {
            genreId = req.params.id;
            const genre = await MemberFromApp.destroy({ where: { id: genreId } });
            return res.status(http_status_codes.OK).json({ message: 'Genre Deleted Successfully' });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting Genre"
            });
        }
    }



};