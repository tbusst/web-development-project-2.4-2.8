import axios from 'axios';
import { useEffect, useState } from 'react';

import { FiMenu } from 'react-icons/fi';
import { FaHome } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';

import Post from '../../Components/Post';

import placeholder from '../../Images/placeholder.png'

export default function Home() {
    const [postsData, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/api/posts')
            .then(res => res.data)
            .then(posts => {
                console.log(posts)
                setPosts(posts)
            })
    }, [])

    const posts = postsData.map(postData => {
        console.log(postData)
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
            <aside>
                <button className='menu-button'>
                    <FiMenu />
                    <div className='Sidebar'>
                        <div className='user-info'>
                            <img src={userinfo.profile} alt='profile' />
                            <p>{userinfo.username}</p>
                        </div>
                        <hr />
                        <ul>
                            <li>
                                <BsFillPersonFill />
                                <a href='/placeholder'>Profile</a>
                            </li>
                            <li>
                                <FaHome />
                                <a href='/'>Home</a>
                            </li>
                        </ul>
                    </div>
                </button>
            </aside>
            <section className='Posts'>
                {posts}
            </section>
        </main>
    );
};