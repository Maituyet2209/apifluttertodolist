const mongoose = require("mongoose");

const connection = mongoose.createConnection(
  "mongodb+srv://todo:tuyetmai@cluster0.nkkuej5.mongodb.net/ToDo",
  {
    serverSelectionTimeoutMS: 10000,
  }
);

connection.on("open", () => {
  console.log("MongoDb Connected");
});

connection.on("error", (err) => {
  console.log("MongoDb Connection Error:", err);
});

module.exports = connection;
