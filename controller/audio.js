const http_status_codes = require('http-status-codes');
const {
   
    Audio
} = require('../database/database');
module.exports = {

    async createAudio(req, res, next) {
        try {
            const {
                description,
                imageUrl,
                audioUrl
            } = req.body;           
            const audio = await Audio.create({
                description: description,
                imageUrl: imageUrl,
                audioUrl: audioUrl

            });
            return res.status(http_status_codes.CREATED).json(audio);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Audio"
            });
        }
    },

    async updateAudio(req, res, next) {
        try {
            const {
                description,
                imageUrl,
                audioUrl
            } = req.body;
            audioId = req.params.id;
            const audio = await Audio.update({
                description: description,
                imageUrl: imageUrl,
                audioUrl: audioUrl
            }, {
                where: {
                    id: audioId
                }
            });
            return res.status(http_status_codes.OK).json({
                message: 'Audio Updated Successfully'
            });
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating Audio"
            });
        }
    },

    async getAudio(req, res, next) {
        try {
            audioId = req.params.id;
            const audio = await Audio.findOne({where: {id: audioId }});
            return res.status(http_status_codes.OK).json(audio);
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching Audio"
            });
        }
    },

    async getAllAudios(req, res, next) {
        try {            
            const audios = await Audio.findAll();
            return res.status(http_status_codes.OK).json(audios);
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Audios"
            });
        }
    },


    async deleteAudio(req, res, next) {
        try {    
            audioId = req.params.id;        
            const audio = await Audio.destroy({where: {id: audioId}});
            return res.status(http_status_codes.OK).json({message: 'Audio Deleted Successfully'});
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting Audio"
            });
        }
    }
    

};