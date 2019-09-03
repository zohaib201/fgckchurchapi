const http_status_codes = require('http-status-codes');
const {

    Prayer,
    Member,
    MemberFromApp
} = require('../database/database');
module.exports = {

    async createPrayer(req, res, next) {
        try {
            const {
                description
            } = req.body;
            memberId = req.params.id;
            const memberObject = await Member.findOne({
                where: { memberFromAppId: memberId },
                include: { model: MemberFromApp }
            });
            // console.log(memberObject);

            if (memberObject) {
                const prayer = await Prayer.create({
                    description: description,
                    isApproved: false,
                    memberFromAppId: memberId,
                    memberName: memberObject.member_from_app.name,
                    whatsapp: memberObject.landline_kuwait,
                    email: memberObject.email_id1,
                });
                return res.status(http_status_codes.CREATED).json(prayer);
            } else {

                return res.status(http_status_codes.CREATED).json({ message: 'Sorry! You can not request for prayer untill your complete data is filled by admin. Please contact admin' });
            }


        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Prayer"
            });
        }
    },

    async approvePrayer(req, res, next) {
        try {
            prayerId = req.params.id;
            const prayer = await Prayer.update({
                isApproved: true
            }, {
                    where: {
                        id: prayerId
                    }
                });
            return res.status(http_status_codes.OK).json({
                message: 'Prayer Approved Successfully'
            });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Approving Prayer"
            });
        }
    },

    async updatePrayer(req, res, next) {
        try {
            const {
                description
            } = req.body;
            prayerId = req.params.id;
            const prayer = await Prayer.update({
                description: description
            }, {
                    where: {
                        id: prayerId
                    }
                });
            return res.status(http_status_codes.OK).json({
                message: 'Prayer Updated Successfully'
            });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating Prayer"
            });
        }
    },

    async getPrayer(req, res, next) {
        try {
            prayerId = req.params.id;
            const prayer = await Prayer.findOne({ where: { id: prayerId } });
            return res.status(http_status_codes.OK).json(prayer);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching Prayer"
            });
        }
    },

    async getAllPrayers(req, res, next) {
        try {
            const prayer = await Prayer.findAll();
            return res.status(http_status_codes.OK).json(prayer);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Prayers"
            });
        }
    },

    async getAllApprovedPrayers(req, res, next) {
        try {
            const prayers = await Prayer.findAll({ where: { isApproved: true } });
            return res.status(http_status_codes.OK).json(prayers);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching AllApprovedPrayers"
            });
        }
    },


    async deletePrayer(req, res, next) {
        try {
            prayerId = req.params.id;
            const prayer = await Prayer.destroy({ where: { id: prayerId } });
            return res.status(http_status_codes.OK).json({ message: 'Prayer Deleted Successfully' });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting Prayer"
            });
        }
    }

};