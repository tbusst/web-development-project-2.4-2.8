import {
    useState,
    useRef
} from 'react';
import {
    signIn,
    signUp
} from '../../firebase';

// Import icons
import { BiUpload } from 'react-icons/bi';

export default function Signup(props) {
    // Declare state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [error, setError] = useState('');

    const hiddenFileInput = useRef(null);

    // Handles sign in
    const handleSubmit = (e) => {
        e.preventDefault();
        props.startLoading(true);
        // Reset error message
        setError('')

        // Prevent blank fields
        if (!email || !password) {
            setError('Please enter an email and password.');
        } else {
            // Calls sign up function
            signUp(email, password, username, profileImage)
                .then(res => {
                    signIn(email, password)
                        // Redirects to home page
                        .then(res => window.location.href = '/home')
                        .catch(err => setError(err))
                })
                .catch(err => setError(err))
        }
    }

    return (
        <section className='SignUp-form'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    id='email'
                    placeholder='Email'
                    onChange={
                        e => setEmail(e.target.value)
                    }
                />
                <input
                    type='text'
                    id='username'
                    placeholder='Username'
                    onChange={
                        e => setUsername(e.target.value)
                    }
                />
                <input
                    type='password'
                    id='password'
                    placeholder='Password'
                    onChange={
                        e => setPassword(e.target.value)
                    }
                />
                <div className='profile-image-container'>
                    <p>
                        {hiddenFileInput.current?.files[0]?.name || 'Profile Picture'}
                    </p>
                    <button
                        type='button'
                        onClick={() => hiddenFileInput.current.click()}
                    >
                        <BiUpload />
                    </button>
                    <input
                        type='file'
                        id='profile'
                        ref={hiddenFileInput}
                        onChange={async e => {
                            // Get file
                            let image = e.currentTarget.files[0];
                            setProfileImage(image);
                        }}
                    />
                </div>
                <button type='submit'>Sign Up</button>
                {/* Displays error message */}
                {error && <p className='error'>{error}</p>}
                <div className='signup-link'>
                    <p>Already have an account?</p>
                    <a href='_' onClick={e => {
                        e.preventDefault();
                        props.setMode('signin');
                    }}>Sign in</a>
                </div>
            </form>
        </section>
    );
};