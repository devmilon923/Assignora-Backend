const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token)
    return res.status(401).json({ sucess: false, message: "Token not found" });
  try {
    const payload = jwt.verify(token, process.env.Secret);
    req.userInfo = payload;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ sucess: false, message: error.message });
  }
};
module.exports = { authUser };
