import { newPost, uploadImage } from "../../firebase";
import { useState } from "react";
import Select from "react-select";

export default function CreatePost() {
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState('');

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
            <h1>Memor.ie</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder='Description'
                    onChange={e => setDescription(e.target.value)}
                />
                <Select
                    isMulti={true}
                    options={options}
                    onChange={e => setTags(e)}
                />
                <input
                    type='file'
                    onChange={e => setImage(e.target.files[0])}
                />
                <button type='submit'>Post</button>
            </form>
        </div>
    );
};