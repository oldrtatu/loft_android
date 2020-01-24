import React, { useReducer } from 'react';
import axios from 'axios';
import {Platform} from 'react-native';

export function addtask(url,token,data){
    return new Promise(async (resolve, reject) => {
        await axios({
            method: "POST",
            data: data,
            url : url + '/task',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            if(res.data.code == "ADD_SUCC"){
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

export function deletetask(url,token,data){
    return new Promise(async (resolve, reject) => {
        await axios({
            method: "DELETE",
            data: data,
            url : url + '/task',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            if(res.data.code == "DELETE_SUCC"){
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