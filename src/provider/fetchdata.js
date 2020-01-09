import React from 'react'

import axios from 'axios';

export function fetch_data(url,token,path){
    return new Promise(async(resolve,reject)=> {
        await axios({
            method:"get",
            url: url+path,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res=>{
            if(res.data){
                resolve(res.data)
            }else{
                resolve({"message": "Invalid request"})
            }
        })
        .catch(err=>{
            if(err.response){
                resolve({"message": "Not found"})
            }else{
                resolve({"message":"Network error"})
            }
        })
    })
    
}