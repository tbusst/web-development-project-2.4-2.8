export default function Home() {
    return (
        <main className='Landing'>
            <button
                id='guest'
                onClick={
                    () => window.location.href = '/home'
                }
            >Continue as guest</button>
            <section className='Login'>
                <h1>Memor.ie</h1>
                <button
                    onClick={
                        () => window.location.href = '/placeholder'
                    }
                >Sign up</button>
                <p>Already have an account?</p>
                <a href='/placeholder'>Sign in</a>
            </section>
            <p id='attribution'>Photo by Sarandy Westfall on Unsplash</p>
        </main>
    );
};