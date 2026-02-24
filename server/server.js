require("dotenv").config();
const express = require("express");
const connectDb = require("./config/db");
const urlRouter = require("./routes/urlRoute");
const URL = require("./models/url");

const app = express();

//middleware
app.use(express.json());

//route
app.use("/url", urlRouter);

const PORT = process.env.PORT || 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is listening at the port ${PORT}`);
  });
});
