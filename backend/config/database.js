const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      //   useCreateIndex: true,
      //   useFindAndModify: false,
      //   useNewUrlParser: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server ${data.connection.host}`);
    })
    .catch((err) => {
      console.log("Mongodb Error", err);
    });
};

module.exports = connectDatabase;
