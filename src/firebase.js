// Import firebase modules
import { initializeApp } from "firebase/app";
import {
    getAnalytics,
    logEvent
} from "firebase/analytics";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
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
    child,
    remove
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
                        profileImage: profileImage,
                        likedPosts: []
                    })
                    uploadImage(profileImage, user.uid)
                        .then(res => {
                            updateProfile(user, {
                                displayName: username,
                                photoURL: res[0]
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
            if (user) resolve(user)
            else reject('No user logged in')
        });
    })
}

// Upload image to storage
const imagesRef = ref(storage, 'images');
const uploadImage = (image, userId) => {
    return new Promise((resolve, reject) => {
        const imageName = `${Date.now()}: ${image.name}`
        let imageRef = ref(imagesRef, `post/${imageName}`);
        if (userId) imageRef = ref(imagesRef, `user/${userId}`)

        // Upload image
        uploadBytes(imageRef, image)
            .then(() => {
                logEvent(analytics, 'upload_image');
                // Get image download url
                getDownloadURL(imageRef)
                    .then(url => resolve([url, imageName]))
                    .catch(error => reject(error));
            })
            .catch(error => reject(error));
    })
}

// Create a new post
const newPost = (desc, res, tags) => {
    return new Promise((resolve, reject) => {
        getUser()
            .then(user => {
                const newPostKey = push(child(refDatabase(database), 'posts')).key;
                const postData = {
                    author: user.displayName,
                    authorId: user.uid,
                    authorUrl: user.photoURL,
                    desc: desc,
                    imageUrl: res[0],
                    storageLocation: res[1],
                    likes: 0,
                    tags: tags,
                    id: newPostKey
                }

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

// Get all posts
const getPosts = () => {
    return new Promise((resolve, reject) => {
        const postsRef = refDatabase(database, 'posts')
        get(postsRef)
            .then(snapshot => snapshot.val())
            .then(posts => resolve(posts))
            .catch(error => reject(error));
    })
}

// gets current user's posts
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

// likes or unlikes a post based on the action bool
const handleLike = (postId, authorId, action) => {
    return new Promise((resolve, reject) => {
        const amount = action ? 1 : -1;
        getUser()
            .then(user => {
                const postRef = refDatabase(database, `posts/${postId}`);
                const userPostRef = refDatabase(database, `user-posts/${authorId}/${postId}`);
                update(postRef, {
                    likes: increment(amount)
                })
                update(userPostRef, {
                    likes: increment(amount)
                })
                const postLikesRef = refDatabase(database, `users/${user.uid}/likedPosts/${postId}`);
                if (action) {
                    const updates = {};
                    updates['/users/' + user.uid + '/likedPosts/' + postId] = postId;
                    update(refDatabase(database), updates)
                        .then(() => resolve('Post liked'))
                        .catch(error => reject(error));
                }
                else remove(postLikesRef)
            })
            .catch(error => reject(error));

    })
}

// Get user likes
const getUserLikes = () => {
    return new Promise((resolve, reject) => {
        getUser()
            .then(user => {
                const userLikedRef = refDatabase(database, `users/${user.uid}/likedPosts`);
                get(userLikedRef)
                    .then(snapshot => snapshot.val())
                    .then(likedPosts => resolve(likedPosts))
                    .catch(error => reject(error));
            })
    })
}

const deletePost = (postId, storageLocation) => {
    return new Promise((resolve, reject) => {
        getUser()
            .then(
                user => {
                    const postRef = refDatabase(database, `posts/${postId}`);
                    const userPostRef = refDatabase(database, `user-posts/${user.uid}/${postId}`);
                    if (storageLocation) {
                        const imageRef = ref(storage, `images/post/${storageLocation}`);
                        deleteObject(imageRef)
                            .then(() => logEvent(analytics, 'delete_image'))
                    }
                    remove(postRef)
                    remove(userPostRef)
                        .then(resolve('Post deleted'))
                }
            )
    })
}

// Export functions
export {
    uploadImage,
    signIn,
    signUp,
    signOutUser,
    getUser,
    newPost,
    getPosts,
    getUserPosts,
    getUserLikes,
    handleLike,
    deletePost
};