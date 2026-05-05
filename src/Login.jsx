import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUserName, setLoggedUserName] = useState("");
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();

        const response = await fetch("http://localhost:3001/users");
        const users = await response.json();

        const loggedUser = users.find(
            (user) =>
                user.email === email.trim() &&
                user.password === password.trim()
        );

        if (loggedUser) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", JSON.stringify(loggedUser));
            window.dispatchEvent(new Event("storage"));

            setMessage("");
            setLoggedUserName(loggedUser.name);
            setIsLoggedIn(true);
        } else {
            setMessage("Invalid email or password.");
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                {isLoggedIn ? (
                    <div className="success-box">
                        <h2>Login successful!</h2>
                        <p>Welcome back, {loggedUserName}!</p>
                        <button onClick={() => navigate("/recipes")}>
                            Go to Recipes
                        </button>
                    </div>
                ) : (
                    <>
                        <h1>Login</h1>

                        <p className="auth-subtitle">
                            Welcome back! Please log in to continue.
                        </p>

                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    required
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    required
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>

                            <button type="submit">Login</button>
                        </form>

                        {message && <p className="error-message">{message}</p>}

                        <p className="auth-link">
                            Don't have an account? <Link to="/register">Register here</Link>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default Login;