import { useEffect, useState } from "react";
import { getUser, getUserPosts, getUserLikes } from '../../firebase';

// Import the components
import Sidebar from '../../Components/Sidebar/Sidebar';
import ProfileBanner from '../../Components/ProfileBanner/ProfileBanner';
import Post from '../../Components/Post/Post';

// Export the Profile page
export default function Profile() {
    const [username, setUsername] = useState('');
    const [profileImage, setProfileImage] = useState([]);
    const [postsData, setPosts] = useState([]);
    const [likes, setLikes] = useState(0);
    const [userLikes, setUserLikes] = useState([]);

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
                Object.keys(res).map((key) => {
                    const { likes } = res[key];
                    setLikes(prevLikes => prevLikes + likes)
                })
            })

        getUserLikes()
            .then(res => {
                setUserLikes(res)
            })
            .catch(err => console.log(err))
    }, []);

    let posts = []
    if (postsData) {
        posts = Object.keys(postsData).map((key, index) => {
            const { author, authorUrl, desc, imageUrl, likes, tags, id } = postsData[key];
            if (postsData[key]) {
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
            }
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
                    likes={likes}
                />
                {posts}
            </section>
        </main>
    );
};