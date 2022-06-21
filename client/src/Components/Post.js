import {
    IoMdThumbsUp,
    IoMdThumbsDown
} from 'react-icons/io'

export default function Post(props) {
    const { desc, image, likes, dislikes, tags } = props
    return (
        <article className='Post'>
            <img src={require(`../Images/${image}`)} alt={desc} />
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