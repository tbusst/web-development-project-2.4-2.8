//import './Home.scss'

export default function Home() {
    return (
        <div className='Home'>
            <button id='guest'>Continue as guest</button>
            <div className='Login'>
                <h1>Memor.ie</h1>
                <button>Sign up</button>
                <p>Already have an account?</p>
                <a href='/'>Sign in</a>
            </div>
            <p id='attribution'>Photo by sarandy westfall on Unsplash</p>
        </div>
    );
};