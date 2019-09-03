const http_status_codes = require('http-status-codes');
const {
   
    Genre
} = require('../database/database');
module.exports = {

    async createGenre(req, res, next) {
        try {
            const {
                name
            } = req.body;           
            const genre = await Genre.create({
                name: name
            });
            return res.status(http_status_codes.CREATED).json(genre);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Genre"
            });
        }
    },

    async updateGenre(req, res, next) {
        try {
            const {
                name
            } = req.body;
            genretId = req.params.id;
            const genre = await Genre.update({
                name: name
            }, {
                where: {
                    id: genretId
                }
            });
            return res.status(http_status_codes.OK).json({
                message: 'Genre Updated Successfully'
            });
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating Genre"
            });
        }
    },

    async getGenre(req, res, next) {
        try {
            genreId = req.params.id;
            const genre = await Genre.findOne({where: {id: genreId }});
            return res.status(http_status_codes.OK).json(genre);
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching Genre"
            });
        }
    },

    async getAllGenres(req, res, next) {
        try {            
            const genre = await Genre.findAll();
            return res.status(http_status_codes.OK).json(genre);
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Genres"
            });
        }
    },


    async deleteGenre(req, res, next) {
        try {    
            genreId = req.params.id;        
            const genre = await Genre.destroy({where: {id: genreId}});
            return res.status(http_status_codes.OK).json({message: 'Genre Deleted Successfully'});
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting Genre"
            });
        }
    }

};