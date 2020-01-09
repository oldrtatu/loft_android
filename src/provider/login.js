import React, { useReducer } from 'react';
import axios from 'axios';

export function loginuser(url,username, password) {
    return new Promise(async (resolve, reject) => {
        await axios({
            method: 'POST',
            data: {
                email : username,
                password
            },
            url : url + '/login'
        })
        .then((res) => {
            if(res.data.code == "LOGGED_IN"){
                resolve(res.data)
            }else{
                reject({
                    "message":"Token expired"
                })
            }
            
        })
        .catch((err) => {
            if (err.response){
                reject({
                    "message":err.response.data.message
                })
            }else{
                reject({
                    "message":"Network error"
                })
            }
        });
    }) 
}

export function change_password(url,token,data){
    return new Promise(async (resolve, reject) => {
        await axios({
            method: 'POST',
            data: {
                newPassword : data.newPassword,
                currentPassword: data.currentPassword
            },
            url : url + '/changePassword',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            if(res.data.code == "UPDATE_SUCC"){
                resolve(res.data)
            }else{
                reject({
                    "message":"Token expired"
                })
            }
            
        })
        .catch((err) => {
            if (err.response){
                reject({
                    "message":err.response.data.message
                })
            }else{
                reject({
                    "message":"Network error"
                })
            }
        });
    }) 
}

export function change_userdata(url,token,data){
    return new Promise(async (resolve, reject) => {
        await axios({
            method: "PUT",
            data: data,
            url : url + '/users',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            if(res.data.code == "UPDATE_SUCC"){
                resolve(res.data)
            }else{
                reject({
                    "message":"Token expired"
                })
            }
            
        })
        .catch((err) => {
            if (err.response){
                reject({
                    "message":err.response.data.message
                })
            }else{
                reject({
                    "message":"Network error"
                })
            }
        });
    }) 
}
