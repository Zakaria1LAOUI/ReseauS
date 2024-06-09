import React from 'react';

const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="relative bg-blue-200 p-8 rounded-lg shadow-lg">
                <button onClick={onClose} className="absolute top-0 right-0 m-1 text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
