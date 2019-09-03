var express = require('express');
var router = express.Router();
const financialController = require('../controller/financial');


router.post('/create/:id', financialController.createFinancial );
router.post('/update/:id', financialController.updateFinancial );
router.post('/delete/:id', financialController.deleteFinancial );
router.get('/get/:id', financialController.getFinancial );
router.get('/getall', financialController.getAllFinancials );
router.get('/getallbymemberfromapp/:id', financialController.getAllFinancialsByMemberFromApp );



module.exports = router;