import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Chatbot() {
    const history = useNavigate();
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/get_response', { message: query, userID: '123' });
            setResponse(res.data.response);
        } catch (error) {
            console.error(error);
        }
    };

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
            <form onSubmit={handleSubmit}>
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
            <p>{response}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Chatbot;
