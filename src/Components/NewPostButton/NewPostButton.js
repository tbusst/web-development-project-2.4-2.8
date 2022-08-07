// Import icons
import { IoMdCreate } from 'react-icons/io';

export default function NewPostButton() {
    return (
        <button
            className='new-post-button'
            onClick={() => {
                window.location.href = '/new-post'
            }}><IoMdCreate />
        </button>
    );
};