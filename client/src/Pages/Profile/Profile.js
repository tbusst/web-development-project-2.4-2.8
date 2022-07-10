import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from '../../Components/Sidebar/Sidebar';
import ProfileBanner from '../../Components/ProfileBanner/ProfileBanner';

import placeholder from '../../Images/placeholder.png'


export default function Profile() {
    const [username, setUsername] = useState('');

    const userinfo = {
        'username': 'User name',
        'profile': placeholder
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/login`)
            .then(res => {
                console.log(res)
                setUsername(res.data.displayName)
            })
    }, []);

    return (
        <main className='Profile'>
            <Sidebar
                username={username}
                profile={userinfo.profile}
            />
            <section className='Posts'>
                <ProfileBanner
                    username={username}
                    profile={userinfo.profile}
                    likes={2}
                    dislikes={1}
                />
            </section>
        </main>
    );
};