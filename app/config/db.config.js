// Debug
module.exports.debug = {
    HOST: "localhost",
    PORT: 27017,
    DB: "emcomply",
};

module.exports.prod = {
    HOST:
        process.env.DB_USER_NAME +
        ":" +
        process.env.DB_PASSWORD +
        "@" +
        process.env.DB_HOST,
    PORT: 27017,
    DB: process.env.DB,
};
