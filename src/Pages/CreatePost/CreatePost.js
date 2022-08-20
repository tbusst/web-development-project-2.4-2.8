import { newPost, uploadImage, getUser } from "../../firebase";
import { useState, useRef, useEffect } from "react";
import { BiUpload } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";
import Select from "react-select";
import Sidebar from '../../Components/Sidebar/Sidebar';
import Loading from "../../Components/Loading/Loading";

export default function CreatePost() {
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState('');
    const [username, setUsername] = useState([]);
    const [profileImage, setProfileImage] = useState([]);
    const [loading, setLoading] = useState(false);

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
        if (loading) return;
        if (description.trim() === '' || image === '') {
            return alert('Please fill in all fields')
        }
        setLoading(true);
        const tagsList = tags.map(tag => tag.value);

        switch (image.type.split('/')[0]) {
            case 'image':
                uploadImage(image)
                    .then(res => {
                        newPost(description, res, tagsList)
                            .then(res => window.location.href = '/home')
                    })
                    .catch(err => console.log(err));
                break;
            default:
                alert('The file you uploaded is not a valid image')
                setLoading(false)
                break;
        }
    }

    const options = [
        { value: 'miscellaneous', label: 'Miscellaneous' },
        { value: 'landscape', label: 'Landscape' },
        { value: 'portrait', label: 'Portrait' },
        { value: 'nature', label: 'Nature' },
        { value: 'people', label: 'People' },
        { value: 'animals', label: 'Animals' },
        { value: 'food', label: 'Food' },
        { value: 'travel', label: 'Travel' },
        { value: 'fashion', label: 'Fashion' },
        { value: 'sports', label: 'Sports' },
        { value: 'tech', label: 'Tech' },
        { value: 'art', label: 'Art' },
        { value: 'science', label: 'Science' },
        { value: 'education', label: 'Education' },
        { value: 'feelings', label: 'Feelings' },
        { value: 'health', label: 'Health' },
        { value: 'places', label: 'Places' },
        { value: 'religion', label: 'Religion' },
        { value: 'history', label: 'History' },
        { value: 'politics', label: 'Politics' },
        { value: 'fashion', label: 'Fashion' },
        { value: 'funny', label: 'Funny' },
    ]

    return (
        <div className='CreatePost'>
            {loading ? <Loading /> : null}
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
                            accept="image/*"
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