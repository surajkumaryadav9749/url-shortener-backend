require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDb = require("./config/db");
const urlRouter = require("./routes/urlRoute");
const URL = require("./models/url");
const staticRoute = require("./routes/staticRouter");

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//route
app.use("/url", urlRouter);
app.use("/", staticRoute);

//set view engines
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const PORT = process.env.PORT || 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is listening at the port ${PORT}`);
  });
});
