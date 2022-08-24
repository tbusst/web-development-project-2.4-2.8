// Import components
import Signin from '../../Components/Login/Signin';
import Signup from '../../Components/Login/Signup';
import Loading from "../../Components/Loading/Loading";
import WarningBanner from '../../Components/WarningBanner/WarningBanner';

import { useState, useEffect } from 'react';

// Export the Login page
export default function Login() {
    // Gets parameters from url
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);

    const [mode, setMode] = useState(urlParams.get('mode'));
    const [loading, setLoading] = useState(false);

    const startLoading = (mode) => {
        if (mode) setLoading(true);
        else setLoading(false);
    }

    useEffect(() => {
        window.history.replaceState({}, '', '/login?mode=' + mode);
    }, [mode])

    // Render the Login page
    return (
        <main className='Login'>
            {loading ? <Loading /> : null}
            <WarningBanner />
            {/* Displays sign in form or sign up form */}
            {mode === 'signup' && <Signup setMode={setMode} startLoading={startLoading} />}
            {mode === 'signin' && <Signin setMode={setMode} startLoading={startLoading} />}
        </main>
    );
};