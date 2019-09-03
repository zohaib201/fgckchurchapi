const http_status_codes = require('http-status-codes');
const {
   
    Devotional
} = require('../database/database');
module.exports = {

    async createDevotional(req, res, next) {
        try {
            const {
                description,
                title,
                imageUrl
            } = req.body;           
            const devotional = await Devotional.create({
                description: description,
                title: title,
                imageUrl: imageUrl
            });
            return res.status(http_status_codes.CREATED).json(devotional);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Devotional"
            });
        }
    },

    async updateDevotional(req, res, next) {
        try {
            const {
                description,
                title,
                imageUrl
            } = req.body;
            devotionalId = req.params.id;
            const devotional = await Devotional.update({
                title: title,
                description: description,
                imageUrl: imageUrl
                
            }, {
                where: {
                    id: devotionalId
                }
            });
            return res.status(http_status_codes.OK).json({
                message: 'Devotional Updated Successfully'
            });
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating Devotional"
            });
        }
    },

    async getDevotional(req, res, next) {
        try {
            devotionalId = req.params.id;
            const devotional = await Devotional.findOne({where: {id: devotionalId }});
            return res.status(http_status_codes.OK).json(devotional);
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching Devotional"
            });
        }
    },

    async getAllDevotionals(req, res, next) {
        try {            
            const devotional = await Devotional.findAll();
            return res.status(http_status_codes.OK).json(devotional);
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Devotional"
            });
        }
    },


    async deleteDevotional(req, res, next) {
        try {    
            devotionalId = req.params.id;        
            const devotional = await Devotional.destroy({where: {id: devotionalId}});
            return res.status(http_status_codes.OK).json({message: 'Devotional Deleted Successfully'});
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting Devotional"
            });
        }
    }

};