const http_status_codes = require('http-status-codes');
const {

    Member,
    MemberFromApp,
    CellGroup,
    Child,
    GrandChild,
    incharge,
    homeimage
} = require('../database/database');
module.exports = {

    async createMember(req, res, next) {
        try {
            const {
                nameofSpouse,
                namesofChildren,
                namesofGrandChildren,
                landlineKuwait,
                primaryWhatsappContact,
                mobile1Kuwait,
                mobile2Kuwait,
                landlineInternational,
                mobile1International,
                mobile2International,
                emailID1,
                emailID2,
                image,
                member,
                cellGroup,
                address,
                memberName
            } = req.body;
            memberFromAppId = req.params.id;

            const memberFromDataBase = await Member.create({
                spouse: nameofSpouse,
                landline_kuwait: landlineKuwait,
                primary_whatsapp: primaryWhatsappContact,
                mobile1_kuwait: mobile1Kuwait,
                mobile2_kuwait: mobile2Kuwait,
                landline_international: landlineInternational,
                mobile1_international: mobile1International,
                mobile2_international: mobile2International,
                email_id1: emailID1,
                email_id2: emailID2,
                family_photo: image,
                isApproved: true,
                isBlocked: false,
                memberFromAppId: memberFromAppId,
                cellGroupId: cellGroup[0].id,
                address: address,
                name:memberName
            });

            const children = await namesofChildren.forEach(child => {
                Child.create({
                    name: child.value,
                    memberId: memberFromDataBase.id
                })
            });

            const grandChildren = await namesofGrandChildren.forEach(granChild => {
                GrandChild.create({
                    name: granChild.value,
                    memberId: memberFromDataBase.id
                })
            });

            return res.status(http_status_codes.CREATED).json(memberFromDataBase);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Member"
            });
        }
    },

    async blockMember(req, res, next) {
        try {
            memberId = req.params.id;
            const member = await Member.update({
                isBlocked: true
            }, {
                    where: {
                        id: memberId
                    }
                });
            return res.status(http_status_codes.OK).json({
                message: 'Member Blocked Successfully'
            });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Blocking Member"
            });
        }
    },

    async unBlockMember(req, res, next) {
        try {
            memberId = req.params.id;
            const member = await Member.update({
                isBlocked: false
            }, {
                    where: {
                        id: memberId
                    }
                });
            return res.status(http_status_codes.OK).json({
                message: 'Member UnBlocked Successfully'
            });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in UnBlocking Member"
            });
        }
    },

    async blockMemberf(req, res, next) {
        try {
            memberId = req.params.id;
            const member = await MemberFromApp.update({
                isBlocked: true,
                isApproved:false
            }, {
                    where: {
                        id: memberId
                    }
                });
            return res.status(http_status_codes.OK).json({
                message: 'Member Blocked Successfully'
            });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Blocking Member"
            });
        }
    },

    async unBlockMemberf(req, res, next) {
        try {
            memberId = req.params.id;
            const member = await MemberFromApp.update({
                isBlocked: false,
                isApproved: true
            }, {
                    where: {
                        id: memberId
                    }
                });
            return res.status(http_status_codes.OK).json({
                message: 'Member UnBlocked Successfully'
            });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in UnBlocking Member"
            });
        }
    },


    async updateMember(req, res, next) {
        console.log("ok")
        try {
            const {
                name
            } = req.body;
            const {
                nameofSpouse,
                // namesofChildren,
                // namesofGrandChildren,
                landlineKuwait,
                primaryWhatsappContact,
                mobile1Kuwait,
                mobile2Kuwait,
                landlineInternational,
                mobile1International,
                mobile2International,
                emailID1,
                emailID2,
                image,
                cellGroup,
                address,
                memberName
            } = req.body;
            console.log("Image in UPDATE AI ---------------------------------------------------");
            console.log(image);
            memberFromAppId = req.params.id;
   let memberFromDataBase = {};
           if(image){
             memberFromDataBase = await Member.update({
                spouse: nameofSpouse,
                landline_kuwait: landlineKuwait,
                primary_whatsapp: primaryWhatsappContact,
                mobile1_kuwait: mobile1Kuwait,
                mobile2_kuwait: mobile2Kuwait,
                landline_international: landlineInternational,
                mobile1_international: mobile1International,
                mobile2_international: mobile2International,
                email_id1: emailID1,
                email_id2: emailID2,
                family_photo: image,
                cellGroupId: cellGroup[0].id,
                address: address,
                name:memberName
            },{where:{id:req.params.id}});
           }else{
            memberFromDataBase = await Member.update({
                spouse: nameofSpouse,
                landline_kuwait: landlineKuwait,
                primary_whatsapp: primaryWhatsappContact,
                mobile1_kuwait: mobile1Kuwait,
                mobile2_kuwait: mobile2Kuwait,
                landline_international: landlineInternational,
                mobile1_international: mobile1International,
                mobile2_international: mobile2International,
                email_id1: emailID1,
                email_id2: emailID2,
                cellGroupId: cellGroup[0].id,
                address: address,
                name:memberName
            },{where:{id:req.params.id}});
           }


            // const genre = await Genre.update({
            //     name: name
            // }, {
            //         where: {
            //             id: genretId
            //         }
            //     });
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

    async getMember(req, res, next) {
        try {
            memberId = req.params.id;
            const member = await Member.findOne({ where: { id: memberId }, include: [{model: Child}, {model: GrandChild}, {model: MemberFromApp}] });
            return res.status(http_status_codes.OK).json(member);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching Member"
            });
        }
    },

    async getMemberByMemberFromAppId(req, res, next) {
        try {
            memberFromAppId = req.params.id;
            const member = await Member.findOne({
                 where: { memberFromAppId: memberFromAppId }, include: [{ model: Child }, { model: GrandChild }, { model: MemberFromApp }] });
            return res.status(http_status_codes.OK).json(member);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching Member"
            });
        }
    },

    async getAllMembers(req, res, next) {
        try {

            const members = await Member.findAll({
                include: [{ model: Child }, { model: GrandChild }, { model: MemberFromApp }]
            });


            return res.status(http_status_codes.OK).json(members);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Members"
            });
        }
    },


    async deleteMember(req, res, next) {
        try {
            genreId = req.params.id;
            const genre = await Genre.destroy({ where: { id: genreId } });
            return res.status(http_status_codes.OK).json({ message: 'Genre Deleted Successfully' });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting Genre"
            });
        }
    },

    async createincharge(req, res, next) {
        try {
            const {
                pht,
                description,
                name
            } = req.body;

            const inch = await incharge.create({
                description: description,
                photo: pht,
                name: name
            });

            return res.status(http_status_codes.CREATED).json(inch);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating icharge"
            });
        }
    },

    async getallincharge(req, res, next) {
        try {
            const allincharge = await incharge.findAll();
            return res.status(http_status_codes.OK).json(allincharge);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching incharge"
            });
        }
    },

    async delincharge(req, res, next) {
        try {
            id = req.params.id;
            const delinchar = await incharge.destroy({ where: { id: id } });
            return res.status(http_status_codes.OK).json({ message: 'image Deleted Successfully' });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting image"
            });
        }
    },

    async addhomephoto(req, res, next) {
        try {
            const {
                pht,
            } = req.body;

            const homeimg = await homeimage.create({
                home_img: pht
            });

            return res.status(http_status_codes.CREATED).json(homeimg);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating icharge"
            });
        }
    },
    async deletephoto(req, res, next) {
        try {
            id = req.params.id;
            const delimg = await homeimage.destroy({ where: { id: id } });
            return res.status(http_status_codes.OK).json({ message: 'image Deleted Successfully' });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting image"
            });
        }
    },

    async getallphotos(req, res, next) {
        try {
            const allphotos = await homeimage.findAll();
            return res.status(http_status_codes.OK).json(allphotos);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching incharge"
            });
        }
    },

};