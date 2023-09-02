const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// Define the path for storing uploaded CSV files
const CSV_PATH = path.join('/uploads/csv');

// Define the schema for the CSV model
const csvSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
        unique: true,
    },
    originalName: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

// Configure Multer storage options
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', CSV_PATH));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

// Define static methods for the CSV model
csvSchema.statics.uploadedCsv = multer({ storage: storage }).single('csvFile');
csvSchema.statics.uploadPath = CSV_PATH;

// Create the CSV model
const CSV = mongoose.model('CSV', csvSchema);

module.exports = CSV;
