const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
// const { categories } = require("../models");
var ObjectId = require("mongodb").ObjectID;
const db = require("../models");
const Role = db.role;

exports.getRoles = (req, res) => {
    Role.find({}).exec((err, roles) => {
        if (err) {
            res.status(403).json({ message: err });
            return;
        }
        res.status(200).json({ data: roles });
    });
};
