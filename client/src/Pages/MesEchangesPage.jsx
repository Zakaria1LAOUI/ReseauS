import React from 'react';
import { Link } from 'react-router-dom';

const exchanges = [
    { id: 1, name: 'John Doe', date: '2024-07-01', message: 'Discussion about project management.' },
    { id: 2, name: 'Jane Smith', date: '2024-06-25', message: 'Advice on career development.' },
    // Ajoutez d'autres échanges ici
];

const MesEchangesPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-20">
            <h1 className="text-3xl text-purple-500 font-bold mb-8">Mes échanges</h1>
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-bold text-teal-500 mb-4">Echanges passés</h2>
                    <ul>
                        {exchanges.map((exchange) => (
                            <li key={exchange.id} className="border-b border-gray-200 py-4">
                                <Link to={`/discussion/${exchange.id}`} className="text-xl font-semibold text-blue-500 hover:underline">
                                    {exchange.name}
                                </Link>
                                <p className="text-gray-500">{exchange.date}</p>
                                <p className="text-gray-700">{exchange.message}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MesEchangesPage;
