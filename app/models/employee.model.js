const mongoose = require("mongoose");

const Employee = mongoose.model(
    "Employee",
    new mongoose.Schema(
        {
            firstName: {
                type: String,
                required: [true, "First name is required"],
                validate: {
                    validator: function (name) {
                        return /^[a-zA-Z]+$/.test(name);
                    },
                    message: "Only alphabetic characters allowed.",
                },
            },
            lastName: {
                type: String,
                required: [true, "Last Name is required"],
                validate: {
                    validator: function (name) {
                        return /^[a-zA-Z]+$/.test(name);
                    },
                    message: "Only alphabetic characters allowed.",
                },
            },
            primaryEmail: {
                type: String,
                index: true,
                unique: true,
                required: [true, "Primary Email address is required"],
                match: /.+\@.+\..+/,
            },
            secondaryEmail: {
                type: String,
                index: true,
                unique: true,
                required: [true, "Secondary Email address is required"],
                match: /.+\@.+\..+/,
            },
            mobile: {
                type: String,
                required: [true, "Mobile is required."],
                unique: true,
                validate: [
                    {
                        validator: function (mobile) {
                            return mobile.toString().length === 11;
                        },
                        message: (mobile) =>
                            `Mobile Number Must Have 11 Numbers. You entered ${
                                mobile.value
                            }, which is ${
                                mobile.value.toString().length
                            } numbers long.`,
                    },
                    {
                        validator: function (mobile) {
                            return (
                                !isNaN(parseFloat(mobile)) && isFinite(mobile)
                            );
                        },
                        message: (mobile) =>
                            `Mobile Number Can Only Contain Number Values. You entered ${mobile.value}.`,
                    },
                ],
            },
            status: { type: Boolean, default: false },
            companyId: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Company",
                },
            ],
        },
        { timestamps: true },
        { versionKey: false }
    )
);
module.exports = Employee;
