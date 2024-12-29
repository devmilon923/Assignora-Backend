const mongoose = require("mongoose");

const DBConnect = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("DB connected");
    // console.log(await mongoose.connection.db.listCollections().toArray());
  } catch (error) {
    console.log(error);
  }
};
module.exports = DBConnect;
