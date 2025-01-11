const express = require("express");
const {
  setcookie,
  logout,
  test,
  addUser,
  updateUserInfo,
  myProfile,
} = require("../controllers/auth");
const { authUser } = require("../middlewares/authUser");
const route = express.Router();

route.post("/set-cookie", setcookie);
route.get("/logout", logout);
route.get("/test", authUser, test);
route.post("/update-profile", authUser, updateUserInfo);
route.post("/add-user", addUser);
route.get("/myprofile", authUser, myProfile);

module.exports = route;
