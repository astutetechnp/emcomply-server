const { authJwt, firebase } = require("../middlewares");

const {
    uploadSingle,
    uploadImages,
    resizeImages,
    getResult,
} = require("../services/image.service");
const controller = require("../controllers/products.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/getProducts", controller.getProducts);
    app.get("/api/getExpiringProducts", controller.getExpiringProducts);
    app.get("/api/getLatestProducts", controller.getLatestProducts);
    app.get("/api/getProductsByCategory", controller.getProductsByCategory);
    app.post(
        "/api/addProduct",
        [firebase.isFirebaseAuthorized, uploadSingle],
        controller.addProduct
    );
    app.post("/api/getProductsNearBy", controller.getProductsNearBy);
    app.post("/api/uploadImage", uploadSingle, controller.uploadImage);
    app.post(
        "/api/uploadImages",
        uploadImages,
        resizeImages,
        controller.uploadImages
    );

    app.put("/api/updateProductViews", controller.updateProductViews);
    app.get("/api/searchProduct", controller.searchProduct);

    app.get(
        "/api/getProductByCategory/:categoryId/:pageNumber",
        controller.getProductByCategory
    );
};
