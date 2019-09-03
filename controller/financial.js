const http_status_codes = require('http-status-codes');
const {

    Financial
} = require('../database/database');
module.exports = {

    async createFinancial(req, res, next) {
        try {
            const {
                description,
                amount,
                date
            } = req.body;
            memberFromAppId = req.params.id;
             const financial = await Financial.create({
                description: description,
                amount: amount,
                date: date,
                memberFromAppId: memberFromAppId

            });
            return res.status(http_status_codes.CREATED).json(financial);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Financial"
            });
        }
    },

    async updateFinancial(req, res, next) {
        try {
            const {
                description,
                amount,
                date
            } = req.body;
            financialId = req.params.id;
            const financial = await Financial.update({
                description: description,
                amount: amount,
                date: date
            }, {
                    where: {
                        id: financialId
                    }
                });
            return res.status(http_status_codes.OK).json({
                message: 'Financial Updated Successfully'
            });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating Financial"
            });
        }
    },

    async getFinancial(req, res, next) {
        try {
            financialId = req.params.id;
            const financial = await Financial.findOne({ where: { id: financialId } });
            return res.status(http_status_codes.OK).json(financial);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching Financial"
            });
        }
    },

    async getAllFinancialsByMemberFromApp(req, res, next) {
        try {
            memberFromAppId = req.params.id;
            const financials = await Financial.findAll({ where: {memberFromAppId: memberFromAppId}});
            return res.status(http_status_codes.OK).json(financials);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All FinancialsByMemberFromApp"
            });
        }
    },


    async getAllFinancials(req, res, next) {
        try {
            const financials = await Financial.findAll();
            return res.status(http_status_codes.OK).json(financials);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Financials"
            });
        }
    },


    async deleteFinancial(req, res, next) {
        try {
            financialId = req.params.id;
            const financial = await Financial.destroy({ where: { id: financialId } });
            return res.status(http_status_codes.OK).json({ message: 'Financial Deleted Successfully' });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting Financial"
            });
        }
    }

};