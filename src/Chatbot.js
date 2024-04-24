    import React from 'react';
    import axios from 'axios';
    import { useNavigate } from 'react-router-dom';

    function Chatbot() {
        const history = useNavigate();

        const handleLogout = () => {
            axios.get('http://localhost/govbotreactphp/logout.php')
            .then(() => {
                // Redirect to login page after logout
                history('/login');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        };

        return (
            <div>
            <h1>Chatbot Interface</h1>
            {/* Your chatbot interface code here */}
            <button onClick={handleLogout}>Logout</button>
            </div>
        );
    }

    export default Chatbot;
