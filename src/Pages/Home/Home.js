import { useEffect, useState } from 'react';
import { getUser, getPosts, getUserLikes } from '../../firebase';
import { IoMdCreate } from 'react-icons/io';

// Components
import Post from '../../Components/Post/Post';
import Sidebar from '../../Components/Sidebar/Sidebar';

// Export the Home page
export default function Home() {
    const [postsData, setPosts] = useState([]);
    const [username, setUsername] = useState([]);
    const [profileImage, setProfileImage] = useState([]);
    const [userLikes, setUserLikes] = useState([]);

    // Get posts from server and user data from Firebase
    useEffect(() => {
        getUser()
            .then(res => {
                setUsername(res.displayName)
                setProfileImage(res.photoURL)
            })
            .catch(err => console.log(err))

        getPosts()
            .then(res => setPosts(res))

        getUserLikes()
            .then(res => {
                setUserLikes(res)
            })
            .catch(err => console.log(err))
    }, [])

    // Turns post data into Post components
    let posts = []
    if (postsData) {
        posts = Object.keys(postsData).map((key, index) => {
            const { author, authorUrl, desc, imageUrl, likes, tags, id } = postsData[key];
            return (
                <Post
                    author={author}
                    authorUrl={authorUrl}
                    desc={desc}
                    image={imageUrl}
                    likes={likes}
                    tags={tags}
                    id={id}
                    userLikes={userLikes}
                    key={index}
                />
            )
        });
    }

    // Render the Home page
    return (
        <main className='Home'>
            <Sidebar
                username={username}
                profile={profileImage}
            />
            <button
                className='new-post-button'
                onClick={() => {
                    window.location.href = '/new-post'
                }}><IoMdCreate /></button>
            <section className='Posts'>
                {posts.length !== 0 && posts}
                {!posts.length &&
                    <img
                        className='loading-image'
                        src={require('../../Images/loading.jpg')}
                        alt='loading'
                    />
                }
            </section>
        </main>
    );
};
