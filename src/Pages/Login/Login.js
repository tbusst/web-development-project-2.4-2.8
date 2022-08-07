// Import components
import Signin from '../../Components/Login/Signin';
import Signup from '../../Components/Login/Signup';

import { useState, useEffect } from 'react';

// Export the Login page
export default function Login() {
    // Gets parameters from url
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);

    const [mode, setMode] = useState(urlParams.get('mode'));

    useEffect(() => {
        window.history.replaceState({}, '', '/login?mode=' + mode);
    }, [mode])

    // Render the Login page
    return (
        <main className='Login'>
            {/* Displays sign in form or sign up form */}
            {mode === 'signup' && <Signup setMode={setMode} />}
            {mode === 'signin' && <Signin setMode={setMode} />}
        </main>
    );
};