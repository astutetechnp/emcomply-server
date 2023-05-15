const mongoose = require("mongoose");

const Company = mongoose.model(
    "Company",
    new mongoose.Schema(
        {
            name: {
                type: String,
                required: [true, "Name is required."],
                validate: {
                    validator: function (name) {
                        return /^[a-zA-Z]+$/.test(name);
                    },
                    message: "Only alphabetic characters allowed.",
                },
            },
            employee: { type: Number, default: 0 },
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
            landline: {
                type: String,
                required: [true, "Landline is required."],
                unique: true,
                validate: [
                    {
                        validator: function (landline) {
                            return landline.toString().length === 10;
                        },
                        message: (landline) =>
                            `Landline Number Must Have 10 Numbers. You entered ${
                                landline.value
                            }, which is ${
                                landline.value.toString().length
                            } numbers long.`,
                    },
                    {
                        validator: function (landline) {
                            return (
                                !isNaN(parseFloat(landline)) &&
                                isFinite(landline)
                            );
                        },
                        message: (Landline) =>
                            `Landline Number Can Only Contain Number Values. You entered ${landline.value}.`,
                    },
                ],
            },
            address: String,
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
            cqc: String,
            sponshorship: String,
            logo: String,
            package: {
                type: String,
                enum: ["basic", "silver", "gold"],
                default: "basic",
            },
            status: { type: Boolean, default: false },
        },
        { timestamps: true },
        { versionKey: false }
    )
);
module.exports = Company;
