import React from 'react';
import { Link } from 'react-router-dom';

const mentors = [
    { id: 1, name: 'Dr. Clara Smith', field: 'Data Science', description: 'Experienced data scientist with a passion for mentoring.' },
    { id: 2, name: 'Mr. David Brown', field: 'Cybersecurity', description: 'Cybersecurity expert with extensive knowledge in the field.' },
    // Ajoutez d'autres mentors ici
];

const DemanderMentoratPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-20">
            <h1 className="text-3xl text-purple-500 font-bold mb-8">Demander une mentorat</h1>
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-bold text-teal-500 mb-4">Mentors disponibles</h2>
                    <ul>
                        {mentors.map((mentor) => (
                            <li key={mentor.id} className="border-b border-gray-200 py-4">
                                <Link to={`/discussion/${mentor.id}`} className="text-xl font-semibold text-blue-500 hover:underline">
                                    {mentor.name}
                                </Link>
                                <p className="text-gray-500">{mentor.field}</p>
                                <p className="text-gray-700">{mentor.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DemanderMentoratPage;
