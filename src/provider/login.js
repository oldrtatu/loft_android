import React, { useReducer } from 'react';
import axios from 'axios';

export function loginuser(username, password) {
    return new Promise(async (resolve, reject) => {
        await axios({
            method: 'POST',
            data: {
                email : username,
                password
            },
            url : 'http://xplicitsoftware.co:8080/login'
        })
        .then((res) => {
            if(res.data.code == "LOGGED_IN"){
                resolve(res.data)
            }else{
                reject({
                    "message":"Incorrect details"
                })
            }
            
        })
        .catch((err) => {
            reject({
                "message":"Network error"
            })
        });
    })
    
    
    
}
