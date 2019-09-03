const http_status_codes = require('http-status-codes');
const {
   
    Video
} = require('../database/database');
module.exports = {

    async createVideo(req, res, next) {
        try {
            const {
                description,
                imageUrl,
                videoUrl
            } = req.body;           
            const video = await Video.create({
                description: description,
                imageUrl: imageUrl,
                videoUrl: videoUrl
            });
            return res.status(http_status_codes.CREATED).json(video);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Video"
            });
        }
    },

    async updateVideo(req, res, next) {
        try {
            const {
                description,
                imageUrl,
                videoUrl
            } = req.body;
            videoId = req.params.id;
            const video = await Video.update({
                description: description,
                imageUrl: imageUrl,
                videoUrl: videoUrl
            }, {
                where: {
                    id: videoId
                }
            });
            return res.status(http_status_codes.OK).json({
                message: 'Video Updated Successfully'
            });
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating Video"
            });
        }
    },

    async getVideo(req, res, next) {
        try {
            videoId = req.params.id;
            const video = await Video.findOne({where: {id: videoId }});
            return res.status(http_status_codes.OK).json(video);
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching Video"
            });
        }
    },

    async getAllVideos(req, res, next) {
        try {            
            const videos = await Video.findAll();
            return res.status(http_status_codes.OK).json(videos);
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Videos"
            });
        }
    },


    async deleteVideo(req, res, next) {
        try {    
            videoId = req.params.id;        
            const video = await Video.destroy({where: {id: videoId}});
            return res.status(http_status_codes.OK).json({message: 'Video Deleted Successfully'});
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting Video"
            });
        }
    }

};