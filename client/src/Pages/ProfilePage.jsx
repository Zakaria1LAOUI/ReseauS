import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserContext } from '../userContext';
import Modal from '../Modal';

function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);
    const { user } = useContext(UserContext);
    const params = useParams();
    const userId = params.id;
    const [showAdmirersModal, setShowAdmirersModal] = useState(false);
    const [selectedAdmirerIndex, setSelectedAdmirerIndex] = useState(null);
    const [admirersData, setAdmirersData] = useState([]);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`/profile/${userId}`);
                setProfileData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        const fetchAdmirersData = async () => {
            try {
                const response = await axios.post(`/users/${userId}/admire`);
                setAdmirersData(response.data);
            } catch (error) {
                console.error('Error fetching admirers data:', error);
            }
        };

        fetchProfileData();
        fetchAdmirersData();
    }, [userId]);

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUploadPhoto = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', selectedFile);
        formData.append('userId', user._id);

        try {
            const response = await axios.post('/profile/uploadPhoto', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setProfileData((prevData) => ({
                ...prevData,
                profilePicture: response.data.filePath,
            }));
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };

    const handleOpenAdmirersModal = (index) => {
        setSelectedAdmirerIndex(index);
        setShowAdmirersModal(true);
    };

    const handleCloseAdmirersModal = () => {
        setSelectedAdmirerIndex(null);
        setShowAdmirersModal(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col justify-center h-screen bg-gray-100">
             <div className='flex ml-24 gap-80 mb-4 font-bold text-xl underline' >
             <div>Identiy card:</div>
             <div>Portfolio:</div>
             </div>
             
            <div className='flex gap-32 ml-20 '>
                <div className="p-8 bg-white rounded-lg shadow-lg">
                    <div className="flex gap-16 mb-4">
                        <div className='flex'>
                            <img src={profileData.profilePicture} alt="Profile" className="w-6 h-6 rounded-full mx-auto" />
                            <div className='text-2xl font-bold'>{profileData.username}</div>
                        </div>
                        <button
                            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleOpenAdmirersModal()}>
                            Admirers: {profileData.admirers.length}
                        </button>
                    </div>
                    
                    <div className="mt-4">
                        <img src={profileData.profilePicture} alt="Profile" className="w-24 h-24 rounded-full mx-auto" />
                        {userId === user._id && (
                            <div className="mt-4">
                                <input type="file" onChange={handleFileChange} className="hidden" id="file-input" />
                                <label
                                    htmlFor="file-input"
                                    className="block bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                                    Change Profile Photo
                                </label>
                            </div>
                        )}
                    </div>
                </div>
            <div className="grid grid-cols-3 gap-4">
                {profileData.posts.map((post) => (
                    <div key={post._id} >
                        <img src={post.file} alt="Post" className="w-full rounded-lg shadow" />
                    </div>
                ))}
            </div>

            {showAdmirersModal && (
                <Modal onClose={handleCloseAdmirersModal}>
                    <ul>
                        {Object.values(admirersData).map((admirer, index) => (
                            <li className="flex items-center mb-2" key={index}>
                                <img src={admirer.profilePicture} alt={admirer.username} className="w-8 h-8 rounded-full mr-2" />
                                <div className="text-gray-900">{admirer.username}</div>
                            </li>
                        ))}
                    </ul>
                </Modal>
            )}
            </div>
        </div>
    );
}

export default ProfilePage;
