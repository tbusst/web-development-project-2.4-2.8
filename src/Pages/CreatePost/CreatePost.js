import { newPost, uploadImage, getUser } from "../../firebase";
import { useState, useRef, useEffect } from "react";
import { BiUpload } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";
import Select from "react-select";
import Sidebar from '../../Components/Sidebar/Sidebar';

export default function CreatePost() {
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState('');
    const [username, setUsername] = useState([]);
    const [profileImage, setProfileImage] = useState([]);

    const hiddenFileInput = useRef(null);

    useEffect(() => {
        getUser()
            .then(res => {
                setUsername(res.displayName)
                setProfileImage(res.photoURL)
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const tagsList = tags.map(tag => tag.value);
        uploadImage(image)
            .then(url => {
                newPost(description, url, tagsList)
                    .then(res => window.location.href = '/home')
            })
            .catch(err => console.log(err));
    }

    const options = [
        { value: 'landscape', label: 'Landscape' },
        { value: 'portrait', label: 'Portrait' },
        { value: 'nature', label: 'Nature' },
        { value: 'people', label: 'People' },
        { value: 'animals', label: 'Animals' },
        { value: 'food', label: 'Food' },
        { value: 'travel', label: 'Travel' },
        { value: 'fashion', label: 'Fashion' },
        { value: 'sports', label: 'Sports' },
    ]

    return (
        <div className='CreatePost'>
            <Sidebar
                username={username}
                profile={profileImage}
            />
            <button
                className='back-button'
                onClick={() => {
                    window.location.href = '/home'
                }}
            >
                <FaArrowLeft />
            </button>
            <div className='form-div'>
                <h1>Memor.ie</h1>
                <form onSubmit={handleSubmit}>
                    <textarea
                        placeholder='Description'
                        onChange={e => setDescription(e.target.value)}
                    />
                    <div className='tag-file-container'>
                        <Select
                            isMulti={true}
                            options={options}
                            onChange={e => setTags(e)}
                        />
                        <button
                            type='button'
                            onClick={() => hiddenFileInput.current.click()}
                        >
                            <BiUpload />
                            <p>
                                {hiddenFileInput.current?.files[0]?.name || 'Upload Image'}
                            </p>
                        </button>
                        <input
                            type='file'
                            id='profile'
                            ref={hiddenFileInput}
                            onChange={async e => {
                                // Get file
                                let image = e.currentTarget.files[0];
                                setImage(image);
                            }}
                        />
                    </div>
                    <button type='submit'>Post</button>
                </form>
            </div>
        </div>
    );
};