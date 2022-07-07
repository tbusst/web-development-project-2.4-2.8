import { BsFillPersonPlusFill } from 'react-icons/bs'
import { FaArrowRight } from 'react-icons/fa'

export default function Home() {
    return (
        <main className='Landing'>
            <button
                id='guest'
                onClick={
                    () => window.location.href = '/home'
                }
            >
                <FaArrowRight />
                Continue as guest
            </button>
            <section className='Login'>
                <h1>Memor.ie</h1>
                <button
                    onClick={
                        () => window.location.href = '/login?mode=signup'
                    }
                >
                    <BsFillPersonPlusFill />
                    Sign up
                </button>
                <p>Already have an account?</p>
                <a href='/login?mode=signin'>Sign in</a>
            </section>
            <p id='attribution'>
                <p>Photo by</p>
                <a href='https://unsplash.com/@sarandywestfall_photo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
                >Sarandy Westfall</a>
                <p>on</p>
                <a href='https://unsplash.com/s/photos/memories?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
                >Unsplash</a>
            </p>
        </main>
    );
};