const CSV = require('../models/csv');

module.exports.home = async (req, res) => {

    try {

        let searchTerm = req.query.search
        let query = {}

        if (searchTerm) {
            query = {
                $or: [
                  { originalName: { $regex: new RegExp(searchTerm, 'i') } },
                  { fileName: searchTerm } 
                ]
              };
        }

        const csvs = await CSV.find(query).limit(100);
        const count = await CSV.countDocuments(query);
        let display = Math.min(count, 100);

        const homeVariables = {csvs: csvs, count: count, displayed: display}
        return res.render('home', homeVariables);

    } catch (error) {
        console.log(error)
        return res.send(`<h1>${error}</h1>`);
    }
}

module.exports.uploadCsv = async (req, res) => {
    try {
        await CSV.uploadedCsv(req, res, async (err) => {
            if (err) {
                console.log('******Multer Error!', err);
            }

            if (req.file && req.file.originalname.endsWith(".csv")) {

                let path = CSV.uploadPath + '\\' + req.file.filename;
                let originalName = req.file.originalname || 'Unknown.csv';
                let fileName = req.file.filename;

                await CSV.create({fileName,originalName,path});
            }
        });
    
        return res.redirect('/');

    } catch(error) {
        console.log(error)
        return res.redirect('/');
    }
}