const mongoose = require("mongoose");

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const User = mongoose.model(
    "User",
    new mongoose.Schema(
        {
            username: String,
            email: {
                type: String,
                trim: true,
                lowercase: true,
                unique: true,
                required: "Email address is required",
                validate: [validateEmail, "Please fill a valid email address"],
                match: [
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    "Please fill a valid email address",
                ],
            },
            password: String,
            roles: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Role",
                },
            ],
        },
        { timestamps: true },
        { versionKey: false }
    )
);

module.exports = User;
