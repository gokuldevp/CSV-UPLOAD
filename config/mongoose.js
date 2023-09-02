// Importing the Mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// const uri = "mongodb://127.0.0.1:27017/CSV-Upload"
const uri = process.env.MONGODB_URI;

mongoose.connect(uri
,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // // Add any other options you need
  });

// Creating a connection object "db" that represents the connection to the database
const db = mongoose.connection;

// Handling the 'error' event to log errors when connecting to the database
db.on('error', console.error.bind(console, "Error while connecting to DB!"));

// Using the 'once' event to log a success message once the connection is established
db.once("open", function() {
    console.log("connected to Database: Mongo DB!");
});

// Exporting the 'db' connection for use in other parts of the application
module.exports = db;