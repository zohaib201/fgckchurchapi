const http_status_codes = require('http-status-codes');
const hashedPassword = require("password-hash");
const {
    MemberFromApp
} = require('../database/database');

module.exports = {
    
    async resetPasswordRequest  (req, res, next){
        const {email} = req.body;
        MemberFromApp.findOne({where: {
            email: email
        }}).then(mfa => {
            console.log("Here now ")
            // return res.status(http_status_codes.NOT_FOUND).json({success: mfa});
            if(mfa){
                if(mfa.email === email){
                    const randomCode = require('uuid/v4')();
                    mfa.vCode = randomCode;
                    mfa.save()
                       .then(mfa1 =>{
                           if(require('./sendEmail')(mfa1.email, randomCode)){
                            console.log("reaching here ..... IN TRUE")
                               return res.json({
                                message: "success"
                            });
                            }else{
                                console.log("here in false")
                                return res.json({
                                    message: "false"
                                });
                           }
                           
                       }).catch(err => {
                        return res.json({
                            message: "false"
                        });
                       })
    
                    }else{
                        return res.json({
                            message: "false"
                        });
                }
            }else{
                return res.json({
                    message: "false"
                });

            }
          
        })
        // data  
        // varifiy email
        // email sent
        // save to db against him 
        
        
    },
    async resetPasswordValidate (req, res, next) {
        const {vCode} = req.body;
        MemberFromApp.findOne({where: {
            vCode: vCode
        }}).then(member =>{
            
           if(member){
            if(member.vCode === vCode){
                return res.status(http_status_codes.OK).json({id: member.id ,message: "success"});
            }else{
                return res.json({
                    message: "false"
                }).status(500);
        }
           }else{
            return res.json({
                message: "false"
            }).status(500);
           }
        }).catch(err => {
            return res.status(http_status_codes.NOT_FOUND).json({message: "false"});
        })
    },

    async resetPassword (req, res, next){
            const reqUserId = req.params.id;
            const reqNewPassword = req.body.reqNewPassword;
            console.log(reqNewPassword);
            console.log("Calling pai")
            MemberFromApp.findOne({
                where: { id: reqUserId }
            })
                .then((fetchedUser) => {
                    if(fetchedUser){

                        fetchedUser.password = hashedPassword.generate(reqNewPassword);
                        fetchedUser.save()
                            .then(suser =>{
                                res.json({msg: "success"});
                            }).catch(err => {
                                res.json({msg: "not updated"});
                            })
                    }else{
                        res.json({msg: "not found"});
                    }
                }).catch(err =>{
                    res.json(err);
                })
        
        
    }
}