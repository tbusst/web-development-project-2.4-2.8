import axios from 'axios';
import { useEffect, useState } from 'react';

import Post from '../../Components/Post/Post';
import Sidebar from '../../Components/Sidebar/Sidebar';

import placeholder from '../../Images/placeholder.png'

export default function Home() {
    const [postsData, setPosts] = useState([]);
    const [username, setUsername] = useState([]);
    // const [profile, setProfile] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/posts`)
            .then(res => res.data)
            .then(posts => {
                setPosts(posts)
            })

        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/login`)
            .then(res => {
                console.log(res)
                setUsername(res.data.displayName)
                //setProfile(res.data.photoURL)
            })
            .catch(err => console.log(err))
    }, [])

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

    const userinfo = {
        'username': 'username',
        'profile': placeholder
    }

    return (
        <main className='Home'>
            <Sidebar
                username={username}
                profile={userinfo.profile}
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
