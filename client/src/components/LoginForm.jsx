import { useState } from 'react';
import './styles/LoginForm.css';
import Registeruser from './Registeruser';

function LoginForm({ setlogin }) {
    // Pass setlogin as a prop
    const [showRegister, setShowRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // const response = await fetch('http://localhost:5000/api/users/login', {
            const response = await fetch('https://todo-app-full-stack-opal.vercel.app/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                setlogin(true); // Update login state to true after successful login
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred during login.');
        }
    };

    return (
        <>
            <div className="container">
                {showRegister ? (
                    <Registeruser />
                ) : (
                    <>
                        <h2 className="title">Login form</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="vertical">
                                <label>User name</label>
                                <input type="text" required/>
                            </div>{' '}
                            <div className="vertical">
                                <label>Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="vertical">
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="error">{error}</p>}
                            <div className="buttonscontainer">
                                <button className="btn" type="submit">
                                    Login
                                </button>
                                <button className="btn" type="button" onClick={() => setShowRegister(true)}>
                                    Register
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </>
    );
}

export default LoginForm;
