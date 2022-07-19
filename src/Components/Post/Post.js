import { IoMdThumbsUp } from 'react-icons/io'
import {
    handleLike
} from '../../firebase'
import {
    useState,
    useEffect
} from 'react'

// Export the Post component
export default function Post(props) {
    const {
        author,
        authorUrl,
        desc,
        image,
        tags,
        likes,
        id,
        userLikes
    } = props
    const [liked, setLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(likes)
    const [tagsArr, setTags] = useState()

    const handleLikeClick = (id) => {
        handleLike(id, !liked)
        setLiked(!liked)
        setLikesCount(liked ? likesCount - 1 : likesCount + 1)
    }

    useEffect(() => {
        if (userLikes) {
            Object.keys(userLikes).forEach((key) => {
                if (userLikes[key] === id) setLiked(true)
            })
        }

        console.log(tags)
    }, [userLikes, id])

    // Return the post
    return (
        <article className='Post'>
            <img src={image} alt={desc} />
            <div className='Post-info'>
                <p>{desc}</p>
                <div className='Post-stats'>
                    <h3
                        className='likeCount'
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
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className='Tag'
                            >{tag}</span>
                        ))}
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