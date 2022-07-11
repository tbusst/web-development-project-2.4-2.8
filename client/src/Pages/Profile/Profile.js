import { useEffect, useState } from "react";
import { getUser } from '../../firebase';

import Sidebar from '../../Components/Sidebar/Sidebar';
import ProfileBanner from '../../Components/ProfileBanner/ProfileBanner';

export default function Profile() {
    const [username, setUsername] = useState('');
    const [profileImage, setProfileImage] = useState([]);

    useEffect(() => {
        getUser()
            .then(res => {
                setUsername(res.displayName)
                setProfileImage(res.photoURL)
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <main className='Profile'>
            <Sidebar
                username={username}
                profile={profileImage}
            />
            <section className='Posts'>
                <ProfileBanner
                    username={username}
                    profile={profileImage}
                    likes={2}
                    dislikes={1}
                />
            </section>
        </main>
    );
};