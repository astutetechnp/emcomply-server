const mongoose = require("mongoose");
const { Schema } = mongoose;

const Products = mongoose.model(
    "Products",
    new mongoose.Schema(
        {
            user_id: String,
            name: String,
            image_url: String,
            price: String,
            desc: String,
            city: String,
            category: {
                type: Schema.Types.ObjectId,
                ref: "Categories",
            },
            views: Number,
            taking_to: Number,
            chat: Boolean,
            call: Boolean,
            lat: Number,
            lng: Number,
            hash: String,
            location: {
                type: {
                    type: String,
                    enum: ["Point"],
                    default: "Point",
                },
                coordinates: {
                    type: [Number],
                    default: [0, 0],
                },
            },
            unixTS: {
                type: Number,
                default: Date.now,
            },
        },
        { timestamps: true },
        { versionKey: false }
    ).index({ location: "2dsphere" })
);

module.exports = Products;
