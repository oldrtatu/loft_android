import React, {useReducer} from 'react';
import axios from 'axios';
import {Platform} from 'react-native';

export function loginuser(url, username, password) {
  return new Promise(async (resolve, reject) => {
    await axios({
      method: 'POST',
      data: {
        email: username,
        password,
      },
      url: url + '/login',
    })
      .then(res => {
        if (res.data.code == 'LOGGED_IN') {
          resolve(res.data);
        } else {
          reject({
            message: 'Token expired',
          });
        }
      })
      .catch(err => {
        alert(JSON.stringify(err));
        if (err.response) {
          reject({
            message: err.response.data.message,
          });
        } else {
          reject({
            message: 'Network error',
          });
        }
      });
  });
}

export function change_password(url, token, data) {
  return new Promise(async (resolve, reject) => {
    await axios({
      method: 'POST',
      data: {
        newPassword: data.newPassword,
        currentPassword: data.currentPassword,
      },
      url: url + '/changePassword',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.data.code == 'UPDATE_SUCC') {
          resolve(res.data);
        } else {
          reject({
            message: 'Token expired',
          });
        }
      })
      .catch(err => {
        if (err.response) {
          reject({
            message: err.response.data.message,
          });
        } else {
          reject({
            message: 'Network error',
          });
        }
      });
  });
}

export function change_userdata(url, token, data) {
  return new Promise(async (resolve, reject) => {
    await axios({
      method: 'PUT',
      data: data,
      url: url + '/users',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.data.code == 'UPDATE_SUCC') {
          resolve(res.data);
        } else {
          reject({
            message: 'Token expired',
          });
        }
      })
      .catch(err => {
        if (err.response) {
          reject({
            message: err.response.data.message,
          });
        } else {
          reject({
            message: 'Network error',
          });
        }
      });
  });
}

export function upload_user_image(url, token, data) {
  return new Promise(async (resolve, reject) => {
    let form = new FormData();

    form.append('file', {
      name: data.fileName,
      type: data.type,
      uri:
        Platform.OS === 'android' ? data.uri : data.uri.replace('file://', ''),
    });

    await axios({
      method: 'POST',
      data: form,
      url: url + '/uploads',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(res => {
        if (res.data.code == 'UPLOAD_SUCC') {
          resolve(res.data);
        } else {
          reject({
            message: 'Token expired',
          });
        }
      })
      .catch(err => {
        if (err.response) {
          reject({
            message: err.response.data.message,
          });
        } else {
          reject({
            message: 'Network error',
          });
        }
      });
  });
}
