import { BsFillPersonPlusFill } from 'react-icons/bs'
import { FaArrowRight } from 'react-icons/fa'

// Export the Landing page
export default function Landing() {
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
                {/* Sign up */}
                <h1>Memor.ie</h1>
                <button
                    onClick={
                        () => window.location.href = '/login?mode=signup'
                    }
                >
                    <BsFillPersonPlusFill />
                    Sign up
                </button>
                {/* Sign in */}
                <p>Already have an account?</p>
                <a href='/login?mode=signin'>Sign in</a>
            </section>
            {/* Photo by Sarandy on Unsplash */}
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