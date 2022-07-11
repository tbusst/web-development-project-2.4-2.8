import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";
import {
    getAuth,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';

// Firebase config variables
const firebaseConfig = {
    apiKey: "AIzaSyBUqE9n5anaB2qdCFsw2LgwJxR-b0HqSLs",
    authDomain: "web-development-project-2-4.firebaseapp.com",
    projectId: "web-development-project-2-4",
    storageBucket: "web-development-project-2-4.appspot.com",
    messagingSenderId: "956772061515",
    appId: "1:956772061515:web:dffec2bc9060f7fc7618ce",
    measurementId: "G-VZSWREVKND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage();
const auth = getAuth();

// Sign in with email and password
const signIn = (email, password) => {
    return new Promise((resolve, reject) => {
        // Sign in
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                resolve(userCredentials.user);
            })
            .catch((error) => {
                const errorMessage = error.message;
                reject(errorMessage);
            });
    })
}

// Sign up with email and password and update profile
const signUp = (email, password, username, profileImage) => {
    return new Promise((resolve, reject) => {
        // Checks if all fields are filled out
        if (!email || !password || !username || !profileImage) {
            reject('Missing required fields');
        } else {
            // Create user 
            createUserWithEmailAndPassword(auth, email, password)
                // Update profile with username and profile image
                .then((userCredentials) => {
                    const user = userCredentials.user;
                    uploadImage(profileImage, user.uid)
                        .then(res => {
                            updateProfile(user, {
                                displayName: username,
                                photoURL: res
                            }).then(() => resolve(user));
                        })
                        .catch(error => reject(error));
                })
                .catch(error => reject(error.message));
        }
    })
}

// Sign out
const signOutUser = () => {
    return new Promise((resolve, reject) => {
        signOut(auth)
            .then(res => resolve('User signed out'))
            .catch(error => {
                const errorMessage = error.message;
                reject(errorMessage);
            });
    })
}

// Get current user
const getUser = () => {
    return new Promise((resolve, reject) => {
        getAuth().onAuthStateChanged(user => {
            if (user) { resolve(user) }
            else { reject('No user logged in') }
        });
    })
}

// Upload image to storage
const imagesRef = ref(storage, 'images');
const uploadImage = (image, userId) => {
    return new Promise((resolve, reject) => {
        const imageRef = ref(imagesRef, userId);
        // Upload image
        uploadBytes(imageRef, image)
            .then(() => {
                // Get image download url
                getDownloadURL(imageRef)
                    .then(url => resolve(url))
                    .catch(error => reject(error));
            })
            .catch(error => reject(error));
    })
}

// Export functions
export {
    uploadImage,
    signIn,
    signUp,
    signOutUser,
    getUser
};