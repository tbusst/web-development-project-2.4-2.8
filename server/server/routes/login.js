import express from 'express';
var router = express.Router();
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDT-oSg3hGNYU6xmcpBVQl__FP1B8QpWik",
    authDomain: "web-development-project-2-4.firebaseapp.com",
    projectId: "web-development-project-2-4",
    storageBucket: "web-development-project-2-4.appspot.com",
    messagingSenderId: "956772061515",
    appId: "1:956772061515:web:5b801d9f372ad2c77618ce",
    measurementId: "G-YHDGCMMRXB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

/* GET home page. */
router.post('/', function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const mode = req.body.mode;
    console.log(req.body)

    switch (mode) {
        case 'signup':
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredentials) => {
                    const user = userCredentials.user;
                    res.send(user);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    res.status(401).send(errorMessage);
                }
                );
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
                }
                );
            break;
        default:
            break;
    }
});

export default router;