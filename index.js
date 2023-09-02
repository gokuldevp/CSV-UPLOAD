// Import the 'express' module to create an Express application.
const express = require('express');

// Set the port number to 8000.
const port = process.env.PORT || 8000;

// Create the Express app.
const app = express();

// import mongoose from the mongoose.js file
const db = require('./config/mongoose');

// Middleware to parse incoming request bodies with 'Content-Type: application/x-www-form-urlencoded' format.
app.use(express.urlencoded({extended: true}));


// Using the middleware 'express.static' handles serving static files in Express, Serving static files from the 'assets' directory 
app.use(express.static('./assets'));

app.use('/uploads', express.static(__dirname + '/uploads'));

// Import the 'express-ejs-layouts' module to assess the layout file
const expressLayouts = require("express-ejs-layouts");

//Using express-ejs-layouts middleware
app.use(expressLayouts)

// Extrect style and script from subpages in to te layouts
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

// Use the routes defined in the './routes' file for all incoming requests at the root path ('/').
app.use('/', require('./routes'));

// Set the view engine to 'ejs' to enable rendering of EJS templates.
app.set('view engine', 'ejs');

// Set the 'views' directory to './views' where the EJS templates are located.
app.set('views', './views');

// Start the server and make it listen on the specified port (8000).
app.listen(port, (err)=> {
    // Check for any errors that occurred during server startup. If an error occurs, log the error message.
    if(err){
        console.log(`Error while running the server ${err}`);
    }
    // If the server starts successfully, log a success message along with the port number.
    console.log(`Server is running successfully at port ${port}`)
});