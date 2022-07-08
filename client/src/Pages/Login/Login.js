import { useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/login`,
            {
                email: email,
                password: password,
                mode: urlParams.get('mode'),
                logout: false
            })
            .then(res => window.location.href = '/home')
            .catch(err => setError(err.response.data))
    }

    return (
        <main className='Login'>
            {urlParams.get('mode') === 'signup' &&
                <section className='SignUp-form'>
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='email'>Email</label>
                        <input type='text' id='email' onChange={e => {
                            setEmail(e.target.value)
                        }} />
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' onChange={e => {
                            setPassword(e.target.value)
                        }} />
                        <button type='submit'>Sign Up</button>
                    </form>
                    <p className='error'>{error}</p>
                    <p>Already have an account?</p>
                    <a href='/login?mode=signin'>Sign in</a>
                </section>}
            {urlParams.get('mode') === 'signin' &&
                <section className='SignIn-form'>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='email'>Email</label>
                        <input type='text' id='email' onChange={e => {
                            setEmail(e.target.value)
                        }
                        } />
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' onChange={e => {
                            setPassword(e.target.value)
                        }
                        } />
                        <button type='submit'>Sign In</button>
                        <p className='error'>{error}</p>
                        <p>Dont have an account?</p>
                        <a href='/login?mode=signup'>Sign up</a>
                    </form>
                </section>
            }
        </main>
    );
}