const express =  require('express');
const router = express.Router();

const homeController = require("../controllers/home");

router.get("/", homeController.home);
router.post('/upload', homeController.uploadExcel);



module.exports = router;