// Import components
import Signin from '../../Components/Login/Signin';
import Signup from '../../Components/Login/Signup';

// Export the Login page
export default function Login() {
    // Gets parameters from url
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);

    // Render the Login page
    return (
        <main className='Login'>
            {/* Displays sign in form or sign up form */}
            {urlParams.get('mode') === 'signup' && <Signup />}
            {urlParams.get('mode') === 'signin' && <Signin />}
        </main>
    );
};