import { FiMenu } from 'react-icons/fi'

import Post from '../../Components/Post';
import data from '../../data'

import placeholder from '../../Images/placeholder.png'

export default function Home() {
    const posts = data.map(postData => {
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

    return (
        <main className='Home'>
            <aside>
                <button className='menu-button'>
                    <FiMenu />
                    <div className='Sidebar'>
                        <div className='user-info'>
                            <img src={placeholder} alt='profile' />
                            <p>username</p>
                        </div>
                        <hr />
                        <ul>
                            <li>
                                <button>Profile</button>
                            </li>
                            <li>
                                <button>Home</button>
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