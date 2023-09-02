const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const CSV_PATH = path.join('/uploads/csv');


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
    path:{
        type: String,
        required: true,
        unique: true,
    },

}, { timestamps: true } );


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..', CSV_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

csvSchema.statics.uploadedCsv = multer({ storage: storage }).single('csvFile');
csvSchema.statics.uploadPath = CSV_PATH;

const CSV = mongoose.model('CSV', csvSchema);

module.exports = CSV;