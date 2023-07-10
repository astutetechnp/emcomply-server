const { authJwt } = require("../middlewares");
//const { authJwt, firebase } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);
    app.get("/api/getSliders", controller.sliders);

    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

    app.get(
        "/api/test/mod",
        [authJwt.verifyToken, authJwt.isCompany],
        controller.companyBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    app.get(
        "/api/users",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.userList
    );

    app.get("/api/test/dashboard", [authJwt.verifyToken], controller.dashboard);

    app.post(
        "/api/sendNotification",
        //firebase.isFirebaseAuthorized,
        controller.sendNotification
    );

    app.post(
        "/api/sendNotificationToTopic",
        //firebase.isFirebaseAuthorized,
        controller.sendNotificationToTopic
    );
};
