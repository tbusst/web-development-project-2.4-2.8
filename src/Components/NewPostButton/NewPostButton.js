// Import icons
import { IoMdCreate } from 'react-icons/io';

export default function NewPostButton({ guest }) {
    return (
        <button
            className='new-post-button'
            onClick={() => {
                if (!guest) return window.location.href = '/new-post'
                alert('You must be logged in to create a post')
            }}><IoMdCreate />
        </button>
    );
};