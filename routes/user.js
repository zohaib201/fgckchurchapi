const express = require("express");
const hashedPassword = require("password-hash");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");
const {
    User
} = require("../database/database");
const router = express.Router();

let userExist = "";




//  USER SIGNUP

router.post("/signup", (req, res, next) => {
    const reqData = req.body;
    User.findOne({
        where: {
            email: reqData.email
        }
    }).then(isUserExist => {
        if (isUserExist) {
            res.send("Email is already taken! Please choose another one");
        } else {
            User.create({
                    userName: reqData["userName"],
                    email: reqData["email"],
                    password: hashedPassword.generate(reqData["password"])
                })
                .then(() => {
                    User.findOne({
                        where: {
                            email: reqData["email"]
                        }
                    }).then(fetchedUser => {
                        const token = jwt.sign({
                                email: reqData.email,
                                adminId: fetchedUser.id
                            },
                            "very-long-string-for-secret", {
                                expiresIn: 3000
                            }
                        );
                        return res.status(200).json({
                            token: token,
                            expiresIn: 3000,
                            user: fetchedUser
                        });
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.send.json("Some Error Occured!");
                });
        }
    });
});


//Id
router.get("/:id", (req, res, next) => {
    User.findOne({ where: { id: req.params.id } }).then(Response => {
        res.json(Response);
    })
});

//  USER SIGNIN

router.post("/signin", (req, res, next) => {
    const reqData = req.body;


    User.findOne({
        where: {
            email: reqData.email
        }
    }).then(isUserExist => {
        if (isUserExist) {
            userExist = isUserExist;
            const isAuth = hashedPassword.verify(
                reqData.password,
                isUserExist.password
            );
            if (isAuth) {
                isAuthVerified = isAuth;
                const token = jwt.sign({
                        email: reqData.email,
                        userId: isUserExist.id
                    },
                    "very-long-string-for-secret", {
                        expiresIn: 3000
                    }
                );
                return res.status(200).json({
                    token: token,
                    expiresIn: 3000,
                    user: isUserExist
                });
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
});


//  RESET PASSWORD
router.post("/resetpassword/:id", (req, res, next) => {

    const reqUserId = req.params.id;
    const reqOldPasswored = req.body.oldPassword;
    const reqNewPassword = req.body.newPassword;


    User.findOne({
            where: { id: reqUserId }
        })
        .then((fetchedUser) => {
            const isAuth = hashedPassword.verify(
                reqOldPasswored,
                fetchedUser.password
            );
            if (isAuth) {
                fetchedUser.update({
                        password: hashedPassword.generate(reqNewPassword)
                    })
                    .then(() => {
                        res.json({ message: 'Password reset successfully' });
                    })
            } else if (!isAuth) {
                res.json({ message: 'Invalid password' });
            }
        })

});




// EDIT USER

router.post("/edit/:id", (req, res, next) => {
    const reqData = req.body;
    const reqId = req.params.id;
    User.findOne({ where: { id: reqId } }).then(user => {
        User.update({
                userName: reqData["userName"],
                imageUrl: reqData["imageUrl"]

            }, {
                where: {
                    id: reqId
                }
            })
            .then(() => {
                res.json("User edited successfully!");
            })
            .catch(err => {
                console.log(err);
                res.send.json("Some Error Occured!");
            });
    });
});

module.exports = router;



// {

// 	"userName": "userName2edited",
// 	"firstName": "firstName2edited",
// 	"lastName": "lastName2edited",
// 	"email": "test2edited@example.com",
// 	"password": "userName2edited",
// 	"dob": "dob2edited",
// 	"phNo": "phNo2edited",
// 	"country": "country2edited",
// 	"city": "city2edited",
// 	"companyName": "companyName2edited"

// }