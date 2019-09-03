const http_status_codes = require('http-status-codes');
const {
   
    CellGroup
} = require('../database/database');
module.exports = {

    async createCellGroup(req, res, next) {
        try {
            const {
                cellGroupDetail
            } = req.body;           
            const cellGroup = await CellGroup.create({
                cellGroupDetail: cellGroupDetail
            });
            return res.status(http_status_codes.CREATED).json(cellGroup);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating CellGroup"
            });
        }
    },

    async updateCellGroup(req, res, next) {
        try {
            const {
                cellGroupDetail
            } = req.body;
            cellGroupId = req.params.id;
            const cellGroup = await CellGroup.update({
                cellGroupDetail: cellGroupDetail
            }, {
                where: {
                    id: cellGroupId
                }
            });
            return res.status(http_status_codes.OK).json({
                message: 'CellGroup Updated Successfully'
            });
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating CellGroup"
            });
        }
    },

    async getCellGroup(req, res, next) {
        try {
            cellGroupId = req.params.id;
            const cellGroup = await CellGroup.findOne({where: {id: cellGroupId }});
            return res.status(http_status_codes.OK).json(cellGroup);
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching CellGroup"
            });
        }
    },

    async getAllCellGroups(req, res, next) {
        try {            
            const cellGroups = await CellGroup.findAll();
            return res.status(http_status_codes.OK).json(cellGroups);
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All CellGroups"
            });
        }
    },


    async deleteCellGroup(req, res, next) {
        try {    
            cellGroupId = req.params.id;        
            const cellGroup = await CellGroup.destroy({where: {id: cellGroupId}});
            return res.status(http_status_codes.OK).json({message: 'CellGroup Deleted Successfully'});
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting CellGroup"
            });
        }
    }

};