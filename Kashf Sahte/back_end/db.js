const mongoose = require("mongoose");

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(process.env.DB);
    console.log("conencted to db successfully POINT 1");
  } catch (error) {
    console.log(error);
    console.log("Couldnt connect to db");
  }
};
