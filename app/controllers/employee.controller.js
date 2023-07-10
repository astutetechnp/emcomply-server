const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
// const { categories } = require("../models");
var ObjectId = require("mongodb").ObjectID;
const db = require("../models");
const Employee = db.employee;

exports.addEmployee = (req, res) => {
    const employee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        primaryEmail: req.body.primaryEmail,
        secondaryEmail: req.body.secondaryEmail,
        mobile: req.body.mobile,
        status: req.body.status,
        companyId: req.body.companyId,
    });

    employee.save((err, employeeObj) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.status(200).json({
            message: "Employee was created successfully!",
            data: employeeObj,
        });
    });
};

exports.updateEmployee = (req, res) => {
    var patchObj = req.body;

    Employee.updateOne(
        { _id: req.body._id },
        patchObj,
        function (err, employee) {
            if (err) {
                return res.status(403).json({
                    message: "cannot update Employee",
                });
            } else if (employee) {
                return res.status(200).json({
                    message: "successfully updated employee",
                });
            }
        }
    );
};

exports.getEmployeeById = (req, res) => {
    const id = req.params.employeeId;

    Employee.findById({ _id: ObjectId(id) }, (err, employee) => {
        if (err) {
            res.status(403).json({ message: err });
            return;
        } else if (!employee) {
            res.status(200).json({
                message: "No Employee Found",
            });
            return;
        }
        res.status(200).json({ result: true, data: employee });
    });
};

exports.getEmployees = (req, res) => {
    Employee.find({})
        .populate("companyId", "name")
        .exec((err, employees) => {
            if (err) {
                res.status(403).json({ message: err });
                return;
            }
            res.status(200).json({ data: employees });
        });
};
