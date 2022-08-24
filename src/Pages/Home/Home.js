// Import modules
import {
    useEffect,
    useState,
    useCallback
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
import Loading from '../../Components/Loading/Loading';

// Export the Home page
export default function Home() {
    // States
    const [postsData, setPostsData] = useState([]);
    const [username, setUsername] = useState([]);
    const [profileImage, setProfileImage] = useState([]);
    const [userLikes, setUserLikes] = useState([]);
    const [postOrder, setPostOrder] = useState(['latest']);
    const [orderedPosts, setOrderedPosts] = useState([]);
    const [guest, setGuest] = useState(false);

    // Get posts from server and user data from Firebase
    useEffect(() => {
        // Get the user's data from the database
        getUser()
            .then(res => {
                setUsername(res.displayName)
                setProfileImage(res.photoURL)
            })
            .catch(() => {
                setGuest(true)
                setUsername('Guest')
                setProfileImage(require(
                    '../../Images/guest.png'
                ))
            })


        // Get the posts from the database
        getPosts()
            .then(res => setPostsData(res))

        // Get the user's liked posts from the database
        getUserLikes()
            .then(res => {
                setUserLikes(res)
            })
            .catch(err => console.log(err))
    }, [])

    // Turns post data into Post components
    const posts = useCallback(() => {
        try {
            if (postsData) {
                return (
                    Object.keys(postsData).map((key, index) => {
                        const { author, authorId, authorUrl, desc, imageUrl, likes, tags, id } = postsData[key];
                        return (
                            <Post
                                guest={guest}
                                author={author}
                                authorId={authorId}
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
                    })
                )
            } else return []
        } catch (err) { return [] };
    }, [postsData, userLikes, guest])

    useEffect(() => {
        const postsArr = posts()
        switch (postOrder) {
            case 'oldest':
                setOrderedPosts(postsArr)
                break;
            default:
                setOrderedPosts(postsArr.reverse())
                break;
        }
    }, [postOrder, posts])

    // Render the Home page
    return (
        <main className='Home'>
            {!posts().length && postsData &&
                <Loading />
            }
            <Sidebar
                username={username}
                profile={profileImage}
            />
            <NewPostButton guest={guest} />
            <section className='Posts'>
                <select onChange={e => setPostOrder(e.target.value)}>
                    <option value='latest'>latest</option>
                    <option value='oldest'>oldest</option>
                </select>
                {/* if not posts are found, display a loading gif */}
                {posts().length !== 0 && orderedPosts}
            </section>
        </main>
    );
};
