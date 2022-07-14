import {
    IoMdThumbsUp,
    IoMdThumbsDown
} from 'react-icons/io'

// Export the Post component
export default function Post(props) {
    const { author, desc, image, likes, dislikes, tags } = props
    console.log(author)

    // Return the post
    return (
        <article className='Post'>
            <img src={image} alt={desc} />
            <div className='Post-info'>
                <p>{desc}</p>
                <div className='Post-stats'>
                    <h3>
                        <button>
                            <IoMdThumbsUp />
                        </button> {likes}
                    </h3>
                    <h3>
                        <button>
                            <IoMdThumbsDown />
                        </button> {dislikes}
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
                </div>
            </div>
        </article >
    );
};