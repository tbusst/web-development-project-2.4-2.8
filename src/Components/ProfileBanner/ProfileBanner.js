// Profile banner component
export default function ProfileBanner(props) {
    const { username, profile, likes, dislikes } = props;
    return (
        <header className='ProfileBanner'>
            <div className='user-info'>
                <img src={profile} alt='profile' />
                <p>{username}</p>
            </div>
            <div className='user-stats'>
                <h3>Likes {likes}</h3>
                <div className='vr' />
                <h3>Dislikes {dislikes}</h3>
            </div>
        </header>
    );
};