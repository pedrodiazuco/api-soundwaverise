"use strict";

var admin = require('firebase-admin');
require('dotenv').config();
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});
var bucket = admin.storage().bucket();
module.exports = {
  bucket: bucket
};

/* 
https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse

En el .env
FIREBASE_API_KEY=<your_large_base64_string>


import * as admin from 'firebase-admin';

declare var process: {
    env: {
        FIREBASE_KEYS: string;
    }
}
const initializeFirebaseAdmin = (isProd = true) => {
    const firebase_private_key_b64 = Buffer.from(process.env.FIREBASE_KEYS, 'base64');
    const firebase_private_key = firebase_private_key_b64.toString('utf8');
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(firebase_private_key))
    });
}


export { initializeFirebaseAdmin }
*/