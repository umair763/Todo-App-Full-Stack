import { useState } from 'react';
import './styles/Registeruser.css';
import LoginForm from './LoginForm';

function Registeruser() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch(' http://localhost:5000/api/users/register ', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Registration successful!');
                // Redirect to login
                setTimeout(() => (window.location.href = '/'), 2000);
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <div className="containerr">
                <h2 className="title">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="verticall">
                        <label>Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>

                    <div className="verticall">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="verticall">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}

                    <div className="buttonscontainerr">
                        <button className="btn" type="submit">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Registeruser;
