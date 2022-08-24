// Import icons
import { FiMenu } from 'react-icons/fi';
import { FaHome } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';

// Import react
import { useEffect, useState } from 'react';

// Import firebase functions
import { signOutUser } from '../../firebase';

// Export the Sidebar component
export default function Sidebar(props) {
    const { username, profile } = props;
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        // Toggle the menu
        const button = document.getElementById('menu-button');
        const aside = document.getElementById('aside');

        if (menuOpen) {
            aside.style.width = null;
            button.style.left = null;
            button.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.8)';
        }
        else {
            button.style.left = '-5px'
            aside.style.width = '0';
            button.style.boxShadow = 'none';
        }
    }, [menuOpen]);

    // Return the sidebar
    return (
        <aside id='aside'>
            {/* Open and close the menu */}
            <button
                id='menu-button'
                onClick={() => {
                    if (menuOpen) setMenuOpen(false)
                    else setMenuOpen(true)
                }}
            >
                <FiMenu />
            </button>
            {/* If menu is open displays the menu */}
            {menuOpen &&
                <div className='Sidebar'>
                    <div className='user-info'>
                        <img src={profile} alt='profile' />
                        <p>{username}</p>
                    </div>
                    <hr />
                    <ul>
                        <li>
                            <BsFillPersonFill />
                            <a href='/profile'>Profile</a>
                        </li>
                        <li>
                            <FaHome />
                            <a href='/home'>Home</a>
                        </li>
                        <li>
                            {/* Sign out */}
                            <button onClick={() => {
                                signOutUser()
                                    .then(res => window.location.href = '/')
                            }}>
                                Log out
                            </button>
                        </li>
                    </ul>
                </div>}
        </aside >
    )
}