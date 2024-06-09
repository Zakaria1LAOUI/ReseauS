import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext';

function ExplorePage() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const { user } = useContext(UserContext)
    const admirerId = user._id;

    useEffect(() => {
        axios.get('/explore')
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setLoading(false);
            });
    }, []);
  

    const handleAdmire = async (userId) => {
        try {
            const response = await axios.post(`/users/${userId}/admire`, { admirerId });
            const isAdmired = response.data.admirers.includes(admirerId);
    
            // Mettre à jour localement l'état pour refléter le suivi
            setUsers(prevUsers => prevUsers.map(user => {
                if (user._id === userId) {
                    return { ...user, isFollowed: isAdmired };
                }
                return user;
            }));
        } catch (error) {
            console.error('Error following user:', error);
        }
    };
    

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mt-14 px-4 max-w-xl mx-auto max-h-100 overflow-y-auto">
            <div className="text-lg font-bold">Talented people may impress you:</div>
            <ul className="mt-6 divide-y divide-gray-200">
                {users.map(user => (
                    <li key={user._id} className="py-4 flex items-center justify-between border border-gray-300 shadow rounded">
                        <Link to={`/${user._id}/profile`} className="flex items-center">
                            <img src={user.profilePicture} alt={user.name} className="ml-2 w-10 h-10 rounded-full mr-4" />
                            <h2 className="text-lg font-semibold">{user.name}</h2>
                        </Link>
                        <div>
                        {user.admirers.includes(admirerId) ? <button
                            onClick={() => handleAdmire(user._id)}
                            className={`w-28 h-8 py-1 px-4 rounded font-bold bg-pink-500 hover:bg-pink-700 text-white mr-2`}>
                            Admired
                        </button> : <button
                            onClick={() => handleAdmire(user._id)}
                            className={`w-28 h-8 py-1 px-4 rounded font-bold ${user.isFollowed ? 'bg-pink-500 hover:bg-pink-700' : 'bg-teal-500 hover:bg-teal-700'} text-white mr-2`}>
                            {user.isFollowed ? 'Admired' : 'Admire'}
                        </button>
                    }
                    </div>

                        
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ExplorePage;
