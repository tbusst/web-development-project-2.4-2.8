import Sidebar from '../../Components/Sidebar/Sidebar';
import ProfileBanner from '../../Components/ProfileBanner/ProfileBanner';

import placeholder from '../../Images/placeholder.png'


export default function Profile() {
    const userinfo = {
        'username': 'User name',
        'profile': placeholder
    }

    return (
        <main className='Profile'>
            <Sidebar
                username={userinfo.username}
                profile={userinfo.profile}
            />
            <section className='Posts'>
                <ProfileBanner
                    username={userinfo.username}
                    profile={userinfo.profile}
                    likes={2}
                    dislikes={1}
                />
            </section>
        </main>
    );
};