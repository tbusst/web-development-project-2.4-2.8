import express from 'express';
var router = express.Router();
import { firebase, initializeApp } from 'firebase/app';
import {
    getAuth,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASURMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

/* GET home page. */
router.post('/', function (req, res) {
    if (!req.body.logout) {
        const email = req.body.email;
        const password = req.body.password;
        const mode = req.body.mode;
        const username = req.body.username;
        const profile = req.body.profile;
        const profileName = req.body.profileName;

        switch (mode) {
            case 'signup':
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredentials) => {
                        const user = userCredentials.user;
                        updateProfile(user, {
                            displayName: username
                        }).then(() => {
                            res.send(user);
                        });
                    })
                    .catch(error => {
                        const errorMessage = error.message;
                        res.status(401).send(errorMessage);
                    });
                break;

            case 'signin':
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredentials) => {
                        const user = userCredentials.user;
                        res.send(user);
                    }
                    ).catch((error) => {
                        const errorMessage = error.message;
                        res.status(401).send(errorMessage);
                    });
                break;

            default:
                break;
        }
    } else {
        signOut(auth).then(() => {
            // Sign-out successful.
            res.send('Sign-out successful.')
        }).catch((error) => {
            // An error happened.
            res.status(error);
        });
    }
});

router.get('/', function (req, res) {
    res.send(auth.currentUser);
});

export default router;  