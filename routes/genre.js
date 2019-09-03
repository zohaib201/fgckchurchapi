var express = require('express');
var router = express.Router();
const genreController = require('../controller/genre');


router.post('/create/:id', genreController.createGenre );
router.post('/update/:id', genreController.updateGenre );
router.post('/delete/:id', genreController.deleteGenre );
router.get('/get/:id', genreController.getGenre );
router.get('/getall', genreController.getAllGenres );



module.exports = router;