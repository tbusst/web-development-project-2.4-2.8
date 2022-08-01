// Import modules
import {
    useEffect,
    useState
} from 'react';
import {
    getUser,
    getPosts,
    getUserLikes
} from '../../firebase';

// Components
import Post from '../../Components/Post/Post';
import Sidebar from '../../Components/Sidebar/Sidebar';
import NewPostButton from '../../Components/NewPostButton/NewPostButton';

// Export the Home page
export default function Home() {
    // States
    const [postsData, setPosts] = useState([]);
    const [username, setUsername] = useState([]);
    const [profileImage, setProfileImage] = useState([]);
    const [userLikes, setUserLikes] = useState([]);

    // Get posts from server and user data from Firebase
    useEffect(() => {
        // Get the user's data from the database
        getUser()
            .then(res => {
                setUsername(res.displayName)
                setProfileImage(res.photoURL)
            })
            .catch(err => console.log(err))

        // Get the posts from the database
        getPosts()
            .then(res => setPosts(res))

        // Get the user's liked posts from the database
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
    // reverse the posts so the newest posts are on top
    const reversedPosts = posts.reverse();

    // Render the Home page
    return (
        <main className='Home'>
            <Sidebar
                username={username}
                profile={profileImage}
            />
            <NewPostButton />
            <section className='Posts'>
                {/* if not posts are found, display a loading gif */}
                {posts.length !== 0 && reversedPosts}
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
