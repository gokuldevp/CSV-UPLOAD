const Csv = require('../models/csv');

module.exports.home = async (req, res) => {
    return res.render('home');
}

module.exports.uploadExcel = async (req, res) => {

    Csv.uploadedCsv(req, res, (err) => {
        if (err) {
            console.log('******Multer Error!', err);
        }
        console.log(req.file)
    })

    return res.redirect('back');
}