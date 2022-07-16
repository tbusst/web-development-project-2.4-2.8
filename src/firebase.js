// Import firebase functions
import { initializeApp } from "firebase/app";
import {
    getAnalytics,
    logEvent
} from "firebase/analytics";
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
import {
    getDatabase,
    set,
    ref as refDatabase,
    get,
    increment,
    push,
    update,
    child
} from "firebase/database";

// Firebase config variables
const firebaseConfig = {
    apiKey: "AIzaSyBUqE9n5anaB2qdCFsw2LgwJxR-b0HqSLs",
    authDomain: "web-development-project-2-4.firebaseapp.com",
    projectId: "web-development-project-2-4",
    storageBucket: "web-development-project-2-4.appspot.com",
    databaseURL: "https://web-development-project-2-4-default-rtdb.firebaseio.com/",
    messagingSenderId: "956772061515",
    appId: "1:956772061515:web:dffec2bc9060f7fc7618ce",
    measurementId: "G-VZSWREVKND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const database = getDatabase(app);
const auth = getAuth(app);

// Sign in with email and password
const signIn = (email, password) => {
    return new Promise((resolve, reject) => {
        // Sign in
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                logEvent(analytics, 'sign_in');
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
                    logEvent(analytics, 'sign_up');
                    const user = userCredentials.user;
                    const userRef = refDatabase(database, `users/${user.uid}`);
                    set(userRef, {
                        username: username,
                        email: email,
                        profileImage: profileImage
                    })
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
        getAuth(app).onAuthStateChanged(user => {
            if (user) { resolve(user) }
            else { reject('No user logged in') }
        });
    })
}

// Upload image to storage
const imagesRef = ref(storage, 'images');
const uploadImage = (image, userId) => {
    return new Promise((resolve, reject) => {
        let imageRef = ref(imagesRef, `post/${Date.now()}:${image.name}`)
        if (userId) { imageRef = ref(imagesRef, `user/${userId}`) }

        // Upload image
        uploadBytes(imageRef, image)
            .then(() => {
                logEvent(analytics, 'upload_image');
                // Get image download url
                getDownloadURL(imageRef)
                    .then(url => resolve(url))
                    .catch(error => reject(error));
            })
            .catch(error => reject(error));
    })
}

// Write to database
const writeUserData = (data) => {
    return new Promise((resolve, reject) => {
        console.log(data)
        getUser()
            .then(user => {
                const userRef = refDatabase(database, `users/${user.uid}`);
                set(userRef, {
                    likes: data.likes,
                    dislikes: data.dislikes
                })
                    .then(() => resolve('User data written to database'))
                    .catch(error => reject(error));
            })
    })
}

const databaseAction = (action) => {
    return new Promise((resolve, reject) => {
        getUser()
            .then(user => {
                const userRef = refDatabase(database, `users/${user.uid}`);
                switch (action) {
                    case 'like':
                        set(userRef, {
                            likes: increment(1)
                        })
                            .then(() => resolve('Liked'))
                            .catch(err => reject(err));
                        break;
                    case 'dislike':
                        set(userRef, {
                            dislikes: increment(1)
                        })
                            .then(() => resolve('Disliked'))
                            .catch(err => reject(err));
                        break;
                    default:
                        break;
                }
            })
    })
}

const newPost = (desc, imageUrl, tags) => {
    return new Promise((resolve, reject) => {
        getUser()
            .then(user => {
                const postData = {
                    author: user.displayName,
                    authorUrl: user.photoURL,
                    desc: desc,
                    imageUrl: imageUrl,
                    likes: 0,
                    dislikes: 0,
                    tags: tags
                }

                const newPostKey = push(child(refDatabase(database), 'posts')).key;
                console.log(newPostKey)

                const updates = {};
                updates['/posts/' + newPostKey] = postData;
                updates['/user-posts/' + user.uid + '/' + newPostKey] = postData;
                update(refDatabase(database), updates)
                    .then(() => resolve('Post added'))
                    .catch(error => reject(error));
            })
            .catch(error => reject(error));
    })
}

const getPosts = () => {
    return new Promise((resolve, reject) => {
        const postsRef = refDatabase(database, 'posts')
        get(postsRef)
            .then(snapshot => snapshot.val())
            .then(posts => resolve(posts))
            .catch(error => reject(error));
    })
}

const getUserPosts = () => {
    return new Promise((resolve, reject) => {
        getUser()
            .then(user => {
                const postsRef = refDatabase(database, `user-posts/${user.uid}`)
                get(postsRef)
                    .then(snapshot => snapshot.val())
                    .then(posts => resolve(posts))
                    .catch(error => reject(error));
            })
    })
}

// Export functions
export {
    uploadImage,
    signIn,
    signUp,
    signOutUser,
    getUser,
    writeUserData,
    databaseAction,
    newPost,
    getPosts,
    getUserPosts
};