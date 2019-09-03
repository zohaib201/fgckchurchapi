var express = require('express');
var router = express.Router();
const cellGroupController = require('../controller/cell_group');


router.post('/create', cellGroupController.createCellGroup );
router.post('/update/:id', cellGroupController.updateCellGroup );
router.post('/delete/:id', cellGroupController.deleteCellGroup );
router.get('/get/:id', cellGroupController.getCellGroup );
router.get('/getall', cellGroupController.getAllCellGroups );



module.exports = router;