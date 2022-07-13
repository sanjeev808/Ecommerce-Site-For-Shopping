const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongodb connnet with server ${data.connect.host}`);
    })
  
};
module.exports = connectDatabase;
