const CSV = require("../models/csv");
const parseCSV = require("csv-parser");
const fs = require("fs");
const path = require('path')

// Controller to view and search CSV data
exports.viewFile = async (req, res) => {
  try {
    const fileId = req.params.id;

    const file = await CSV.findById(fileId);

    if (!file) {
      return res.status(404).send("File id found");
    }

    const filePath = path.join(__dirname, "..", file.path); 

    // Check if the file exists before attempting to read it
    if (!fs.existsSync(filePath)) {
      console.error(`File not found at path: ${filePath}`);
      return res.status(404).send("File not found");
    }

    const results = [];

    // Read and parse the CSV file
    fs.createReadStream(filePath)
      .pipe(parseCSV())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", () => {
        if (results.length === 0) {
          return res.status(404).send("No data found in the CSV file");
        }

        const tableHeaders = Object.keys(results[0]);

        let tableRows = results;

        res.render("csvView", {
          title: "CSV Viewer",
          file,
          tableHeaders,
          tableRows,
        });
      })
      .on("error", (error) => {
        console.error("CSV parsing error:", error);
        res.status(500).send("Error parsing CSV file");
      });
  } catch (error) {
    console.error("File retrieval error:", error);
    res.status(500).send("Internal Server Error");
  }
};
