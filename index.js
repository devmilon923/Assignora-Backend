const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoute");
const assignmentRoute = require("./routes/assignmentsRoute");
const DBConnect = require("./services/DBConnect");
const app = express();
app.use(
  cors({
    origin: process.env.App_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// mongodb connection:
DBConnect(process.env.MongodbURL);
app.get("/", (req, res) => {
  res.end("Server in online");
});
app.use("/auth", authRoute);
app.use("/assignment", assignmentRoute);

app.listen(process.env.PORT || 4000, () =>
  console.log(`Server running on port ${process.env.PORT || 4000}`)
);
