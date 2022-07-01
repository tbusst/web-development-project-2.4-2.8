import axios from 'axios';
import { useEffect, useState } from 'react';


import Post from '../../Components/Post';
import Sidebar from '../../Components/Sidebar/Sidebar';

import placeholder from '../../Images/placeholder.png'

export default function Home() {
    const [postsData, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://web-development-project-server.herokuapp.com/api/posts')
            .then(res => res.data)
            .then(posts => {
                setPosts(posts)
            })
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
                username={userinfo.username}
                profile={userinfo.profile}
            />
            <section className='Posts'>
                {posts}
            </section>
        </main>
    );
};