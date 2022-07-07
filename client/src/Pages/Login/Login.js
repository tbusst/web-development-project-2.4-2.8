import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

export default function Login() {
    const firebaseConfig = {
        apiKey: "AIzaSyDT-oSg3hGNYU6xmcpBVQl__FP1B8QpWik",
        authDomain: "web-development-project-2-4.firebaseapp.com",
        projectId: "web-development-project-2-4",
        storageBucket: "web-development-project-2-4.appspot.com",
        messagingSenderId: "956772061515",
        appId: "1:956772061515:web:5b801d9f372ad2c77618ce",
        measurementId: "G-YHDGCMMRXB"
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);

    const handleSubmit = (e) => {
        e.preventDefault();
        const auth = getAuth();

        switch (urlParams.get('mode')) {
            case 'signup':
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredentials) => {
                        const user = userCredentials.user;
                        console.log(user);
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setError(errorMessage)
                        console.log(errorCode, errorMessage);
                    }
                    );
                break;

            case 'signin':
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredentials) => {
                        const user = userCredentials.user;
                        console.log(user);
                    }
                    ).catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setError(errorMessage)
                        console.log(errorCode, errorMessage);
                    }
                    );
                break;
        }
    }

    const app = initializeApp(firebaseConfig);

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