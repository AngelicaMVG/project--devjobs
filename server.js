const express = require("express");
const fs = require("fs-extra");
const ejs = require("ejs");
const { Model } = require("objection");
const bodyParser = require("body-parser");

const pageRouter = require("./src/routers/pageRouter.js");
const apiRouter = require("./src/routers/apiRouter.js");
const authRouter = require("./src/routes/authRouter.js");

const connectToDb = require("./src/database/dbConnect.js");
const knexfile = require("./knexfile.js");

const app = express();
const appDb = connectToDb(knexfile.development);

const passport = require("passport");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");

const registerLocalStrategy = require("./src/middleware/passport-local--registerLocalStrategy.js");
const {
  configDeserializeUser,
  configSerializeUser
} = require("./src/helpers/passport-local--sessionActions.js");

Model.knex(appDb);

app.locals.db = appDb; //locals: esta disponible en toda la app de express

//Json parse configuration

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cookie Parse + Cookie Session middleware
app.use(cookieParser());
app.use(
  cookieSession({
    name: "cookiemonster",
    secret: "superdupersupersecret",
    httpOnly: true,
    signed: false
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(registerLocalStrategy());
passport.serializeUser(configSerializeUser());
passport.deserializeUser(configDeserializeUser());

app.set("view engine", "ejs");
app.use("/", pageRouter);
app.use("/api", apiRouter);
app.use("/auth", authRouter);
app.use(express.static(__dirname + "/public"));

app.use((req, res) => {
  res.type("text/html");
  res.render(`${__dirname}/src/views/404.ejs`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`APP LISTENING ON PORT ${PORT}`);
});
