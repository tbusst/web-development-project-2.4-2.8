import { useState, useRef } from 'react';
import { signIn, signUp } from '../../firebase';
import { BiUpload } from 'react-icons/bi';

// Export the Login page
export default function Login() {
    // Declare state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [error, setError] = useState('');

    // Gets parameters from url
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);

    const hiddenFileInput = useRef(null);

    // Handles sign in
    const handleSubmit = (e) => {
        e.preventDefault();
        // Reset error message
        setError('')

        // Pevent blank fields
        if (!email || !password) {
            setError('Please enter an email and password.');
        } else {
            // Check if user is signing in or signing up
            if (urlParams.get('mode') === 'signup') {
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
            else {
                // Calls sign in function
                signIn(email, password)
                    // Redirects to home page
                    .then(res => window.location.href = '/home')
                    .catch(err => setError(err))
            }
        }
    }

    // Render the Login page
    return (
        <main className='Login'>
            {/* Displays sign in form or sign up form */}
            {urlParams.get('mode') === 'signup' &&
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
                                onClick={
                                    () => hiddenFileInput.current.click()
                                }
                            >
                                <BiUpload />
                            </button>
                            <input
                                type='file'
                                id='profile'
                                ref={hiddenFileInput}
                                onChange={
                                    async e => {
                                        // Get file
                                        let image = e.currentTarget.files[0];
                                        setProfileImage(image);
                                    }
                                }
                            />
                        </div>
                        <button type='submit'>Sign Up</button>
                        {/* Displays error message */}
                        {error && <p className='error'>{error}</p>}
                        <div className='signup-link'>
                            <p>Already have an account?</p>
                            <a href='/login?mode=signin'>Sign in</a>
                        </div>
                    </form>
                </section>}
            {urlParams.get('mode') === 'signin' &&
                <section className='SignIn-form'>
                    <h1>Sign In</h1>
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
                            type='password'
                            id='password'
                            placeholder='Password'
                            onChange={
                                e => setPassword(e.target.value)
                            }
                        />
                        <button type='submit'>Login</button>
                        {/* Displays error message */}
                        {error && <p className='error'>{error}</p>}
                        <div className='signup-link'>
                            <p>Dont have an account?</p>
                            <a href='/login?mode=signup'>Sign up</a>
                        </div>
                    </form>
                </section>}
        </main>
    );
}