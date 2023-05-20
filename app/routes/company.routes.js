const { authJwt } = require("../middlewares");
const controller = require("../controllers/company.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/getCompanies",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.getCompanies
    );
    app.get("/api/getCompanyById/:companyId", controller.getCompanyById);

    app.post("/api/addCompany", controller.addCompany);
    app.put("/api/updateCompany", controller.updateCompany);
};
