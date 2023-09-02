const CSV = require('../models/csv');
const fs = require('fs');
const path = require('path');

// Controller for rendering the home page
module.exports.home = async (req, res) => {
    try {
        // Extract the search term from the query parameters
        let searchTerm = req.query.search;
        
        // Define the query object for MongoDB
        let query = {};

        if (searchTerm) {
            // If a search term is provided, create a MongoDB query using $or operator
            query = {
                $or: [
                    { originalName: { $regex: new RegExp(searchTerm, 'i') } },
                    { fileName: searchTerm }
                ]
            };
        }

        // Fetch up to 100 matching CSV documents from the database
        const csvs = await CSV.find(query).limit(100);

        // Get the total count of matching CSV documents
        const count = await CSV.countDocuments(query);

        // Calculate the number of documents to display (up to 100)
        let display = Math.min(count, 100);

        // Prepare variables to be passed to the template
        const homeVariables = {
            csvs: csvs,
            count: count,
            displayed: display
        };

        // Render the 'home' template with the provided variables
        return res.render('home', homeVariables);

    } catch (error) {
        // Handle errors, log them, and return an error response if necessary
        console.error(error);
        return res.send(`<h1>${error}</h1>`);
    }
}

// Controller for handling CSV file uploads
module.exports.uploadCsv = async (req, res) => {
    try {
        // Use Multer middleware to handle file uploads

        const uploadPath = path.join(__dirname, "../uploads/csv"); 
        if (!fs.existsSync(uploadPath)) {
            // If the directory doesn't exist, create it
            fs.mkdirSync(uploadPath);
            console.log(`Directory '${directoryPath}' created.`);
        }

        await CSV.uploadedCsv(req, res, async (err) => {
            if (err) {
                console.error('******Multer Error!', err);
            }

            if (req.file && req.file.originalname.endsWith(".csv")) {
                // Get the file path, original name, and file name from the request
                let path = CSV.uploadPath + '\\' + req.file.filename;
                let originalName = req.file.originalname || 'Unknown.csv';
                let fileName = req.file.filename;

                // Create a new CSV document in the database
                await CSV.create({ fileName, originalName, path });
            }
        });
    
        // Redirect back to the home page after successful upload
        return res.redirect('/');

    } catch (error) {
        // Handle errors, log them, and redirect to the home page
        console.error(error);
        return res.redirect('/');
    }
}
