import { useState } from 'react';
import { signIn, signUp } from '../../firebase';

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
                        <label htmlFor='email'>Email</label>
                        <input type='text' id='email' onChange={
                            e => setEmail(e.target.value)
                        } />
                        <label htmlFor='username'>Username</label>
                        <input type='text' id='username' onChange={
                            e => setUsername(e.target.value)
                        } />
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' onChange={
                            e => setPassword(e.target.value)
                        } />
                        <label htmlFor='profile'>Profile</label>
                        <input type='file' id='profile' onChange={
                            async e => {
                                // Get file
                                let image = e.currentTarget.files[0];
                                setProfileImage(image);
                            }} />
                        <button type='submit'>Sign Up</button>
                    </form>
                    {/* Displays error message */}
                    {error && <p className='error'>{error}</p>}
                    <p>Already have an account?</p>
                    <a href='/login?mode=signin'>Sign in</a>
                </section>}
            {urlParams.get('mode') === 'signin' &&
                <section className='SignIn-form'>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='email'>Email</label>
                        <input type='text' id='email' onChange={
                            e => setEmail(e.target.value)
                        } />
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' onChange={
                            e => setPassword(e.target.value)
                        } />
                        <button type='submit'>Sign In</button>
                        {/* Displays error message */}
                        {error && <p className='error'>{error}</p>}
                        <p>Dont have an account?</p>
                        <a href='/login?mode=signup'>Sign up</a>
                    </form>
                </section>}
        </main>
    );
}