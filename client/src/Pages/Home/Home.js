import axios from 'axios';
import { useEffect, useState } from 'react';
import { getUser } from '../../firebase';

// Components
import Post from '../../Components/Post/Post';
import Sidebar from '../../Components/Sidebar/Sidebar';

// Export the Home page
export default function Home() {
    const [postsData, setPosts] = useState([]);
    const [username, setUsername] = useState([]);
    const [profileImage, setProfileImage] = useState([]);

    // Get posts from server and user data from Firebase
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/posts`)
            .then(res => res.data)
            .then(posts => {
                setPosts(posts)
            })

        getUser()
            .then(res => {
                console.log(res)
                setUsername(res.displayName)
                setProfileImage(res.photoURL)
            })
            .catch(err => console.log(err))
    }, [])

    // Turns post data into Post components
    const posts = postsData.map(postData => {
        const { desc, image, likes, dislikes, tags } = postData
        return (
            <Post
                desc={desc}
                image={image}
                likes={likes}
                dislikes={dislikes}
                tags={tags}
            />
        )
    })

    // Render the Home page
    return (
        <main className='Home'>
            <Sidebar
                username={username}
                profile={profileImage}
            />
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
