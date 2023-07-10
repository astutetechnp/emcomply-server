const { authJwt } = require("../middlewares");
const controller = require("../controllers/employee.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/getEmployees",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.getEmployees
    );
    app.get(
        "/api/getEmployeeById/:employeeId",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.getEmployeeById
    );

    app.post(
        "/api/addEmployee",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.addEmployee
    );
    app.put(
        "/api/updateEmployee",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateEmployee
    );
};
