// Module imports
import {
    useState,
    useEffect
} from 'react'
import {
    handleLike,
    deletePost
} from '../../firebase'

// Icon imports
import { IoMdThumbsUp } from 'react-icons/io'
import { MdOutlineDelete } from 'react-icons/md'


// Export the Post component
export default function Post(props) {
    const {
        guest,
        author,
        authorId,
        authorUrl,
        desc,
        image,
        storageLocation,
        tags,
        likes,
        id,
        userLikes,
        profilePage
    } = props

    // States
    const [liked, setLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(likes)
    const [initiateDelete, setInitiateDelete] = useState(false)

    // Likes the post 
    // then inverts the liked state and updates the likes count
    const handleLikeClick = (id) => {
        if (!guest) {
            handleLike(id, authorId, !liked)
            setLiked(!liked)
            setLikesCount(liked ? likesCount - 1 : likesCount + 1)
        } else {
            alert('You must be logged in to like posts')
        }
    }

    // Checks if the user has liked the post
    // If so, sets the liked state to true
    useEffect(() => {
        if (userLikes) {
            Object.keys(userLikes).forEach((key) => {
                if (userLikes[key] === id) setLiked(true)
            })
        }
    }, [userLikes, id])

    // Return the post
    return (
        <article className='Post'>
            {profilePage &&
                <button
                    className='delete-button'
                    onClick={() => setInitiateDelete(true)}
                >
                    <MdOutlineDelete />
                </button>
            }
            {initiateDelete &&
                <div className='delete-confirmation'>
                    <p>Are you sure you want to delete this post?</p>
                    <div className='confirmation-buttons'>
                        <button
                            id='confirmation-yes'
                            onClick={() => {
                                setInitiateDelete(false)
                                deletePost(id, storageLocation)
                                    .then(window.location.reload())
                                    .catch(err => console.log(err))
                            }}
                        >Yes</button>
                        <button
                            id='confirmation-no'
                            onClick={() => setInitiateDelete(false)}
                        >No</button>
                    </div>
                </div>
            }
            <img src={image} alt={desc} />
            <div className='Post-info'>
                <p>{desc}</p>
                <div className='Post-stats'>
                    <h3
                        className='likeCount'
                        // If the user has liked the post,
                        // color the icon and text
                        style={liked ? { color: '#e3b706' } : {}}
                    >
                        <button
                            onClick={() => handleLikeClick(id)}
                            style={liked ? { color: '#e3b706' } : {}}
                        >
                            <IoMdThumbsUp />
                        </button> {likesCount}
                    </h3>
                    <div className="vl" />
                    <div className='Post-tags'>
                        {tags ? tags.map((tag, index) => (
                            <span
                                key={index}
                                className='Tag'
                            >{tag}</span>
                        )) : null}
                    </div>
                    <div className="vl" />
                    <h3>{author}</h3>
                    <img
                        className='Post-author-image'
                        src={authorUrl}
                        alt={author}
                    />
                </div>
            </div>
        </article >
    );
};