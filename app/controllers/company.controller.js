const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
// const { categories } = require("../models");
var ObjectId = require("mongodb").ObjectID;
const db = require("../models");
const Company = db.company;

exports.addCompany = (req, res) => {
    const company = new Company({
        name: req.body.name,
        employee: req.body.employee,
        package: req.body.package,
        primaryEmail: req.body.primaryEmail,
        secondaryEmail: req.body.secondaryEmail,
        mobile: req.body.mobile,
        landline: req.body.landline,
        logo: req.body.logo,
        cqc: req.body.cqc,
        sponshorship: req.body.sponshorship,
        address: req.body.address,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        status: req.body.status,
    });

    company.save((err, companyObj) => {
        if (err) {
            return res
                .status(200)
                .json({ result: false, message: err.message });
        }
        res.status(200).json({
            result: true,
            message: "Company was created successfully!",
            data: companyObj,
        });
    });
};

exports.updateCompany = (req, res) => {
    var patchObj = req.body;

    Company.updateOne(
        { _id: ObjectId(req.body.id) },
        patchObj,
        function (err, company) {
            if (err) {
                return res.status(200).json({
                    result: false,
                    message: "cannot update Company",
                });
            } else if (company) {
                return res.status(200).json({
                    result: true,
                    message: "successfully updated company",
                });
            }
        }
    );
};

exports.getCompanyById = (req, res) => {
    const id = req.params.companyId;
    console.log(id);

    Company.findById({ _id: ObjectId(id) }, (err, company) => {
        if (err) {
            res.status(200).json({ result: false, message: err });
            return;
        } else if (!company) {
            res.status(200).json({
                result: false,
                message: "No Company Found",
            });
            return;
        }
        res.status(200).json({ result: true, data: company });
    });
};

exports.getCompanies = (req, res) => {
    Company.find({}, (err, companies) => {
        if (err) {
            res.status(403).json({ message: err });
            return;
        }
        res.status(200).json({ data: companies });
    });
};
