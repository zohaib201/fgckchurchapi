const http_status_codes = require('http-status-codes');
var admin = require("firebase-admin");
var serviceAccount = require("../fgck-60f1c-firebase-adminsdk-psbib-8e482448e4.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fgck-60f1c.firebaseio.com"
});

const {

    Notification,
    MemberFromApp
} = require('../database/database');
module.exports = {

    async createNotifiction(req, res, next) {
        try {
            const {
                description,
                title
            } = req.body;

            const notification = await Notification.create({
                description: description,
                title: title
            });
        

            const membersFromApp = await MemberFromApp.findAll();

            
            if(membersFromApp != ''){
                membersFromApp.forEach(member => {
                    var registrationToken = member.notificationToken;
                    var payload = {
                        notification: {
                            // notification.id + "/" +
                            title: notification.title,
                            body: notification.description
                        }
                    };
    
                    var options = {
                        priority: "high",
                        timeToLive: 60 * 60 * 24
                    };

                    if(registrationToken){
                        admin.messaging().sendToDevice(registrationToken, payload, options)
                        .then(function (response) {
                            console.log("Successfully sent message:", response);
                        })
                        .catch(function (error) {
                            console.log("Error sending message:", error);
                        });
                    }else{
                        console.log("token not found")
                        // return res.json('Token is not availible');
                    }
                    // admin.messaging().sendToDevice(registrationToken, payload, options)
                    //     .then(function (response) {
                    //         console.log("Successfully sent message:", response);
                    //     })
                    //     .catch(function (error) {
                    //         console.log("Error sending message:", error);
                    //     });
                });
            }else{
                return res.json('Error Occured While fetching membersFromApp');
            }


            // membersFromApp.forEach(member => {
            //     var registrationToken = member.notificationToken;
            //     var payload = {
            //         notification: {
            //             title: notification.id + "/" + notification.title,
            //             body: notification.description
            //         }
            //     };

            //     var options = {
            //         priority: "high",
            //         timeToLive: 60 * 60 * 24
            //     };

            //     admin.messaging().sendToDevice(registrationToken, payload, options)
            //         .then(function (response) {
            //             console.log("Successfully sent message:", response);
            //         })
            //         .catch(function (error) {
            //             console.log("Error sending message:", error);
            //         });
            // });


            return res.status(http_status_codes.CREATED).json({ notification, membersFromApp });
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Notification"
            });
        }
    },

    async updateNotifiction(req, res, next) {
        try {
            const {
                description,
                title
            } = req.body;
            notificationId = req.params.id;
            const notification = await Notification.update({
                title: title,
                description: description

            }, {
                    where: {
                        id: notificationId
                    }
                });
            return res.status(http_status_codes.OK).json({
                message: 'Notification Updated Successfully'
            });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating Notification"
            });
        }
    },

    async getNotifiction(req, res, next) {
        try {
            notificationId = req.params.id;
            const notification = await Notification.findOne({ where: { id: notificationId } });
            return res.status(http_status_codes.OK).json(notification);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching Notification"
            });
        }
    },

    async getAllNotifictions(req, res, next) {
        try {
            const notification = await Notification.findAll();
            return res.status(http_status_codes.OK).json(notification);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Notification"
            });
        }
    },


    async deleteNotifiction(req, res, next) {
        try {
            notificationId = req.params.id;
            const notification = await Notification.destroy({ where: { id: notificationId } });
            return res.status(http_status_codes.OK).json({ message: 'Notification Deleted Successfully' });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting Notification"
            });
        }
    },

};