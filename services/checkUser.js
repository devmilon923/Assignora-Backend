const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const setJwt = async (payload) => {
  try {
    const find = await User.findOne({ uid: payload.uid });
    return jwt.sign({ ...payload, _id: find._id }, process.env.Secret, {
      expiresIn: "12h",
    });
  } catch (error) {
    return null;
  }
};

const getPlayload = (token) => {
  return jwt.verify(token, process.env.Secret);
};

module.exports = {
  setJwt,
  getPlayload,
};
