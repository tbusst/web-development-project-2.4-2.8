// Profile banner component
export default function ProfileBanner(props) {
    const { username, profile, likes } = props;
    return (
        <header className='ProfileBanner'>
            <div className='user-info'>
                <img src={profile} alt='profile' />
                <p>{username}</p>
            </div>
            <div className='user-stats'>
                <h3>Likes {likes}</h3>
            </div>
        </header>
    );
};