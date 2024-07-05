import React from 'react';
import { Link } from 'react-router-dom';

const experts = [
    { id: 1, name: 'Dr. Alice Johnson', expertise: 'Project Management', description: 'Expert in project management with 10 years of experience.' },
    { id: 2, name: 'Mr. Bob Williams', expertise: 'Software Development', description: 'Senior developer specializing in full-stack development.' },
    // Ajoutez d'autres experts ici
];

const ConsulterExpertPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-20">
            <h1 className="text-3xl text-purple-500 font-bold mb-8">Consulter un expert</h1>
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-bold text-teal-500 mb-4">Experts disponibles</h2>
                    <ul>
                        {experts.map((expert) => (
                            <li key={expert.id} className="border-b border-gray-200 py-4">
                                <Link to={`/discussion/${expert.id}`} className="text-xl font-semibold text-blue-500 hover:underline">
                                    {expert.name}
                                </Link>
                                <p className="text-gray-500">{expert.expertise}</p>
                                <p className="text-gray-700">{expert.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ConsulterExpertPage;
