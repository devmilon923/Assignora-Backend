const express = require("express");
const { setcookie, logout, test, addUser } = require("../controllers/auth");
const { authUser } = require("../middlewares/authUser");
const route = express.Router();

route.post("/set-cookie", setcookie);
route.get("/logout", logout);
route.get("/test", authUser, test);
route.post("/add-user", addUser);

module.exports = route;
