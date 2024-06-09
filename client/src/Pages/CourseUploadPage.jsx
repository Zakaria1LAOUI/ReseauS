import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserContext } from '../userContext';

function CourseUploadPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const {user} = useContext(UserContext)
    const userId = user._id

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('file', file);

        try {
            await axios.post(`/courses/${userId}`, formData, {
                headers: {
                    'description-Type': 'multipart/form-data'
                }
            });
            alert('Course uploaded successfully!');
            // Clear form fields after successful upload
            setTitle('');
            setDescription('');
            setFile(null);
        } catch (error) {
            console.error('Error uploading course:', error);
            alert('Failed to upload post. Please try again.');
        }
    };

    return (
    
        <form className="bg-purple-100 bg-opacity-10 text-black shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-20 mx-auto w-1/2" onSubmit={handleSubmit}>
    <div className='text-xl font-bold text-center'>
        Add a new Course 
    </div>
    <div className="mb-4 mt-6">
        <label className="block text-sm font-bold mb-2" htmlFor="title">
            Title
        </label>
        <input
            className="shadow bg-teal-100 bg-opacity-20 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
    </div>
    <div className="mb-4">
        <label className="block  text-sm font-bold mb-2" htmlFor="description">
            Description
        </label>
        <textarea
            className="shadow bg-teal-100 bg-opacity-20 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
    </div>
    <div className="mb-4">
        <label className="block  text-sm font-bold mb-2" htmlFor="file">
            File
        </label>
        <input
            className="shadow bg-teal-100 bg-opacity-20 appearance-none border rounded w-full py-2 px-3 text-blue-500 leading-tight focus:outline-none focus:shadow-outline"
            id="file"
            type="file"
            onChange={handleFileChange}
        />
    </div>
    <div className="flex items-center justify-center">
        <button
            className="bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
        >
            Upload
        </button>
    </div>
</form>

    
    )
}

export default CourseUploadPage;
