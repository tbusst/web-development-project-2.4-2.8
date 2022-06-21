export default function Post(props) {
    const { desc, image, likes, dislikes, tags } = props
    return (
        <article className='Post'>
            <img src={require(`../Images/${image}`)} alt={desc} />
            <div className='Post-info'>
                <h1>{desc}</h1>
                <div className='Post-stats'>
                    <h3>{likes}</h3>
                    <h3>{dislikes}</h3>
                    <div className='Post-tags'>
                        {tags.map((tag, index) => (
                            <span key={index}>{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
};