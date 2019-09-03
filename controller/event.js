const http_status_codes = require('http-status-codes');


const {

    Event    
} = require('../database/database');
module.exports = {

    async createEvent(req, res, next) {
        try {
            const {
                description,
                title,
                date
            } = req.body;

            const event = await Event.create({
                description: description,
                title: title,
                date: date
            });       

            return res.status(http_status_codes.CREATED).json(event);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Event"
            });
        }
    },

    async updateEvent(req, res, next) {
        try {
            const {
                description,
                title,
                date
            } = req.body;
            eventId = req.params.id;
            const event = await Event.update({
                title: title,
                description: description,
                date: date

            }, {
                    where: {
                        id: eventId
                    }
                });
            return res.status(http_status_codes.OK).json({
                message: 'Event Updated Successfully'
            });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating Event"
            });
        }
    },

    async getEvent(req, res, next) {
        try {
            eventId = req.params.id;
            const event = await Event.findOne({ where: { id: eventId } });
            return res.status(http_status_codes.OK).json(event);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching Event"
            });
        }
    },

    async getAllEvents(req, res, next) {
        try {
            const event = await Event.findAll();
            return res.status(http_status_codes.OK).json(event);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Event"
            });
        }
    },


    async deleteEvent(req, res, next) {
        try {
            eventId = req.params.id;
            const event = await Event.destroy({ where: { id: eventId } });
            return res.status(http_status_codes.OK).json({ message: 'Event Deleted Successfully' });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting Event"
            });
        }
    }

};