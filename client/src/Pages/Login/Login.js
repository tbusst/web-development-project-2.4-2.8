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
                mode: urlParams.get('mode')
            })
            .then(res => console.log(res.data))
            .catch(err => setError(err.response.data))
    }

    return (
        <main className='Login'>
            {urlParams.get('mode') === 'signup' &&
                <section className='SignUp-form'>
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='username'>Username</label>
                        <input type='text' id='username' onChange={e => {
                            setEmail(e.target.value)
                        }} />
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' onChange={e => {
                            setPassword(e.target.value)
                        }} />
                        <button type='submit'>Sign Up</button>
                    </form>
                    <p className='error'>{error}</p>
                </section>}
            {urlParams.get('mode') === 'signin' &&
                <section className='SignIn-form'>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='username'>Username</label>
                        <input type='text' id='username' onChange={e => {
                            setEmail(e.target.value)
                        }
                        } />
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' onChange={e => {
                            setPassword(e.target.value)
                        }
                        } />
                        <button type='submit'>Sign In</button>
                    </form>
                </section>
            }
        </main>
    );
}