import {
    useState
} from 'react';
import {
    signIn
} from '../../firebase';

export default function Signin(props) {
    // Declare state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Handles sign in
    const handleSubmit = (e) => {
        e.preventDefault();
        // Reset error message
        setError('')

        // Prevent blank fields
        if (!email || !password) {
            setError('Please enter an email and password.');
        } else {
            props.startLoading();
            // Calls sign in function
            signIn(email, password)
                // Redirects to home page
                .then(res => window.location.href = '/home')
                .catch(err => {
                    setError(err)
                    props.startLoading(false);
                })

        }
    }

    return (
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
                    <a href='_' onClick={e => {
                        e.preventDefault();
                        props.setMode('signup');
                    }}>Sign up</a>
                </div>
            </form>
        </section>
    );
};