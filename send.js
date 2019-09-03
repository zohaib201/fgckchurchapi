var admin = require("firebase-admin");

// var serviceAccount = require("./ibookitauth-firebase-adminsdk-12z8y-a2fe01e8eb.json");

var serviceAccount = require("./fgck-60f1c-firebase-adminsdk-psbib-8e482448e4.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fgck-60f1c.firebaseio.com"
});

//  ibookit var registrationToken = "djTDUy2yJIQ:APA91bGdFZ5ZmztwDghwJL19TuPG6kQIvxAzAqP0k03wXZV4gdQicYsNkgjP4d7vLsIbFt46JdIOlsShIhslPZ0njlmCFR7CrS9TY8Sp3Bg_VKTuQgWLp9NfsCeI2f6UFOHbG6yPVx1A";
var registrationToken = "fNGaMPNO14Q:APA91bGeE5z4g8akDLUfnrL-DoUggjRI1XfHeJXZnXyHICv356ZBfX5iVTcPASs68RpnneXtSvReJ9FQC0QhNRxgX0IMvLy4ElurbjZpVSrm8OYd0aPCShHvdNTKtlCJg0JINbyN2Kpg";

var payload = {
    notification: {
        title: "Hi, Zohaib Bhae I am sending a notification ",
        body: "Wow! Thanks Bro. I got your notification... Hunn moja hi moja... Sham swairy moja hi moja"
    }
};

var options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

admin.messaging().sendToDevice(registrationToken, payload, options)
    .then(function (response) {
        console.log("Successfully sent message:", response);
    })
    .catch(function (error) {
        console.log("Error sending message:", error);
    });