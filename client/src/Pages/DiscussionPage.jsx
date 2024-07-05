import React from 'react';
import { useParams } from 'react-router-dom';

const DiscussionPage = () => {
    const { id } = useParams();
    // Vous pouvez remplacer cette partie par une requête à une API pour récupérer les détails de la discussion
    const discussion = {
        id,
        title: 'Titre de la discussion',
        messages: [
            { id: 1, sender: 'John Doe', content: 'Message de John Doe.' },
            { id: 2, sender: 'Vous', content: 'Votre réponse.' },
            // Ajoutez d'autres messages ici
        ]
    };

    return (
        <div className="bg-gray-100 min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-3xl font-bold text-purple-500 mb-4">{discussion.title}</h1>
                    <div className="mb-8">
                        {discussion.messages.map((message) => (
                            <div key={message.id} className="mb-4">
                                <p className="text-gray-700 font-semibold">{message.sender}</p>
                                <p className="text-gray-600">{message.content}</p>
                            </div>
                        ))}
                    </div>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="newMessage">Nouveau message</label>
                            <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" id="newMessage" rows="4"></textarea>
                        </div>
                        <button className="bg-teal-500 text-white px-4 py-2 rounded-lg" type="submit">Envoyer</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DiscussionPage;
