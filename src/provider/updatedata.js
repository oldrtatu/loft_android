import React from 'react'

import axios from 'axios';

export function update_data(url,token,path,data){
    return new Promise(async(resolve,reject)=> {
        await axios({
            method:"PUT",
            url: url+path,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data
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

export function add_data(url,token,path,data){
    return new Promise(async(resolve,reject)=> {
        await axios({
            method:"POST",
            url: url+path,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data
        })
        .then(res=>{
            if(res.data){
                if(res.data.code != "ADD_SUCC"){
                    resolve({"message": res.data.code})
                }else{
                    resolve(res.data.response)
                }
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