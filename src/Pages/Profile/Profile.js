import { useEffect, useState } from "react";
import { getUser, getUserPosts } from '../../firebase';

// Import the components
import Sidebar from '../../Components/Sidebar/Sidebar';
import ProfileBanner from '../../Components/ProfileBanner/ProfileBanner';
import Post from '../../Components/Post/Post';

// Export the Profile page
export default function Profile() {
    const [username, setUsername] = useState('');
    const [profileImage, setProfileImage] = useState([]);
    const [postsData, setPosts] = useState([]);
    const [likes, setLikes] = useState([0, 0]);

    useEffect(() => {
        // Get the user's data from the database
        getUser()
            .then(res => {
                setUsername(res.displayName)
                setProfileImage(res.photoURL)
            })
            .catch(err => console.log(err))

        getUserPosts()
            .then(res => {
                setPosts(res)
                Object.keys(res).map((key, index) => {
                    const { likes, dislikes } = res[key];
                    setLikes(prevLikes => [prevLikes[0] + likes, prevLikes[1] + dislikes])
                })
            })


    }, []);

    let posts = []
    if (postsData) {
        posts = Object.keys(postsData).map((key, index) => {
            const { author, authorUrl, desc, imageUrl, likes, dislikes, tags } = postsData[key];
            return (
                <Post
                    author={author}
                    authorUrl={authorUrl}
                    desc={desc}
                    image={imageUrl}
                    likes={likes}
                    dislikes={dislikes}
                    tags={tags}
                    key={index}
                />
            )
        });
    }

    // Return the profile page
    return (
        <main className='Profile'>
            <Sidebar
                username={username}
                profile={profileImage}
            />
            <section className='Posts'>
                <ProfileBanner
                    username={username}
                    profile={profileImage}
                    likes={likes[0]}
                    dislikes={likes[1]}
                />
                {posts}
            </section>
        </main>
    );
};