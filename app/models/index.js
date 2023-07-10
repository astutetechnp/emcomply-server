const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.company = require("./company.model");
db.employee = require("./employee.model");
db.products = require("./products.model");
db.refreshToken = require("./refreshToken.model");

db.ROLES = ["user", "admin", "company"];

module.exports = db;
