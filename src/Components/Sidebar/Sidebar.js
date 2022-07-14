// Import icons
import { FiMenu } from 'react-icons/fi';
import { FaHome } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';

// Import react
import { useEffect, useState } from 'react';

// Import firebase functions
import { signOutUser, newPost } from '../../firebase';

// Export the Sidebar component
export default function Sidebar(props) {
    const { username, profile } = props;
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        // Toggle the menu
        const button = document.getElementById('menu-button');
        if (menuOpen) { button.style.left = '17.8vw' }
        else { button.style.left = '-2px' }
    }, [menuOpen]);

    // Return the sidebar
    return (
        <aside>
            {/* Open and close the menu */}
            <button
                id='menu-button'
                onClick={() => {
                    if (menuOpen) { setMenuOpen(false); }
                    else { setMenuOpen(true) }
                }}
            >
                <FiMenu />
            </button>
            {/* If menu is open displays the menu */}
            {menuOpen &&
                <div className='Sidebar'>
                    <button onClick={
                        () => {
                            console.log('clicked')
                            newPost(
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus quis ante in rhoncus. Pellentesque porttitor posuere augue, mollis tincidunt augue hendrerit a.",
                                'https://firebasestorage.googleapis.com/v0/b/web-development-project-2-4.appspot.com/o/images%2FPIsLJJv4LjNxfToqOxal8EMzTCB2?alt=media&token=2f4ab123-e2a0-4b32-9761-8d9bedcee916',
                                [
                                    "tag1",
                                    "tag2",
                                    "tag3"
                                ]
                            )
                        }
                    }>LIKE</button>
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