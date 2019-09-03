const express = require("express");
var admin = require("firebase-admin");
var serviceAccount = require("../ibookitauth-firebase-adminsdk-12z8y-a2fe01e8eb.json");
const router = express.Router();










router.get("/push", (req, res, next) => {

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://ibookitauth.firebaseio.com"
    });

    var registrationToken = "f9HvuoEFrJw:APA91bEW3j-OMO0VLe2oaNsBOaV82UpnGf4xEYBbIiVXCENMlhWoEygh-91nb40_E2qOZF3-xe1XzZNzjs64hl2KfkcYJwN9nabkYWUWLdTpMA_IBHTMLp_4OAcRTDslgSq8AsVdHdQ0";

    var payload = {
        notification: {
            title: "This is a Notification",
            body: "Yar ap ko msg aya k ni."
        }
    };

    var options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    admin.messaging().sendToDevice(registrationToken, payload, options)
        .then(function(response) {
            console.log("Successfully sent message:", response);
        })
        .catch(function(error) {
            console.log("Error sending message:", error);
        });
});


module.exports = router;