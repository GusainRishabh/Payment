import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Hamburger() {
    const [isOpen, setIsOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        fetch('student.json')
          .then(response => response.json())
          .then(data => {
            setImageUrl(data[0].file_path); // Set the image URL
          })
          .catch(error => console.error('Error fetching user info:', error));
    }, []);
    
    return (
        <div style={{ position: 'relative' }}>
            <img
                src={imageUrl}
                alt="User Avatar"
                style={{width: '70px',height: '70px',borderRadius: '50%',marginRight: '1rem',border: '2px solid #ddd',boxShadow: '0 4px 8px rgba(0,0,0,0.2)',cursor: 'pointer'
                }}
                onClick={handleToggle}
            />
            {isOpen && (
                <div
                    className="absolute top-12 right-0 w-48 bg-white rounded-lg shadow-md py-2"
                    id="user-dropdown"
                >
                    <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 dark:text-white">Rishabh Gusain</span>
                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@rishabh.com</span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                            <Link
                                to="/studentprofile"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                My Profile
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/EditProfile"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                Edit Profile
                            </Link>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                Delete
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                Sign out
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Hamburger;
