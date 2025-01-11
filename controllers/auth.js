const User = require("../models/userModel");
const { setJwt } = require("../services/checkUser");
const setcookie = async (req, res) => {
  const token = await setJwt(req.body);
  if (!token)
    return res.status(401).send({ success: false, message: "Cookie not set" });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.Environment === "PD" ? true : false,
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    sameSite: "None",
  });
  return res.status(200).send({ success: true, message: "Cookie added" });
};
const logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.Environment === "PD" ? true : false,
    sameSite: "None",
  });
  return res.status(200).send({ success: true, message: "Logout success" });
};
const test = (req, res) => {
  return res.status(401).send({ success: false, message: "Test Route" });
};
const addUser = async (req, res) => {
  try {
    const find = await User.findOne({ uid: req.body.uid });
    if (find) {
      const user = await User.findByIdAndUpdate(find._id, {
        name: req.body.name,
        photo: req.body.photo,
      });
      return res
        .status(200)
        .send({ success: true, message: "Login success", data: user });
    }
    const user = await User.create(req.body);
    return res.status(200).send({ success: true, data: user });
  } catch (error) {
    console.log(error);
    return res.status(404).send({ success: false, message: error });
  }
};
const updateUserInfo = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userInfo._id, req.body);
    const token = await setJwt(req.body);
    if (!token)
      return res
        .status(401)
        .send({ success: false, message: "Cookie not set" });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.Environment === "PD" ? true : false,
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
      sameSite: "None",
    });

    res.status(200);
    return res.send({ success: true, message: "Profile updated" });
  } catch (error) {
    console.log(error.message);
    res.status(400);
    return res.send({ success: false, message: error.message });
  }
};
const myProfile = async (req, res) => {
  try {
    const result = await User.findById(req.userInfo._id);
    res.status(200);
    return res.send({ success: true, data: result });
  } catch (error) {
    console.log(error.message);
    res.status(400);
    return res.send({ success: false, message: error.message });
  }
};
module.exports = {
  setcookie,
  logout,
  test,
  addUser,
  updateUserInfo,
  myProfile,
};
