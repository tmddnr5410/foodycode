"use strict";

const RestStorage = require("./RestStorage");

class Rest{
    constructor(body){
        this.body = body;
    }
    
    async login(){
        const client=this.body;
        try{
            const{rest_psword,rest_id}=await RestStorage.getUserInfo(client.uid);

                if(rest_id === client.uid && rest_psword === client.password){
                    return {success: true};
                }
                else{
                    return {success: false,msg:"회원 정보가 일치하지 않습니다."};
                }
                
        } catch(err){
            return {success: false, msg: "잠시후 다시 시도해주세요."};
            }
        }

    
    async register(){
        const client = this.body;
        try{
            const response = await RestStorage.save(client);
            return response;
        } catch(err){
            const b={success: false,msg: err};
            return b;
        }
    }

    async edit(){
        const client = this.body;
        try{
            const response = await RestStorage.update(client);
            return response;
        }catch(err){
            const b= {success:false,msg:err};
            return b;
        }
    } 
        
}
    
    
module.exports = Rest;