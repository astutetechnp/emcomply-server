const firebaseAdmin = require("firebase-admin");

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY
            ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n")
            : undefined,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        token_uri: process.env.FIREBASE_TOKEN_ID,
    }),
    databaseURL: "https://chaahiyo-baee2-default-rtdb.firebaseio.com",
});

const isFirebaseAuthorized = (req, res, next) => {
    console.log(req.headers);
    // if (authorized) {
    if (req.headers.authtoken) {
        firebaseAdmin
            .auth()
            .verifyIdToken(req.headers.authtoken)
            .then((decodedToken) => {
                console.log("UID : ", decodedToken.uid);
                next();
                return;
            })
            .catch(() => {
                return res.status(403).json({ err: "Firebase Unauthorized" });
            });
        //next();
        return;
    } else {
        return res.status(403).json({ err: "You are Unauthorized" });
    }
};

const firebase = {
    isFirebaseAuthorized,
    firebaseAdmin,
};

module.exports = firebase;
