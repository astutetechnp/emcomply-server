require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { debug, prod } = require("./app/config/db.config");

const app = express();

let connection = null;

var corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://localhost:8081",
        "https://warm-lamington-7817e5.netlify.app/",
    ],
};

app.use(cors());

app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Origin",
        "https://warm-lamington-7817e5.netlify.app/api"
    ); // update to match the domain you will make the request from
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.json());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// serving static files
app.use("/app/uploads", express.static("uploads"));

const db = require("./app/models");
const Role = db.role;

if (process.env.APP_ENV === "debug") {
    connection = `mongodb://${debug.HOST}:${debug.PORT}/${debug.DB}`;
} else {
    connection = `mongodb+srv://${prod.HOST}/${prod.DB}?retryWrites=true&w=majority`;
}

db.mongoose
    .connect(connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch((err) => {
        console.error("Connection error", err);
        process.exit();
    });

//

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/company.routes")(app);
require("./app/routes/products.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "company",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'company' to roles collection");
            });

            new Role({
                name: "admin",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}
