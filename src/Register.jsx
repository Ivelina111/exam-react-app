import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const navigate = useNavigate();

    function handleRegister(event) {
        event.preventDefault();

        const user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");
        window.dispatchEvent(new Event("storage"));

        setIsRegistered(true);
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                {!isRegistered && <h1>Register</h1>}

                {isRegistered ? (
                    <div className="success-box">
                        <h2>Registration successful!</h2>
                        <p>Welcome, {name}! You can now save and create your own recipes.</p>
                        <button onClick={() => navigate("/recipes")}>
                            Go to Recipes
                        </button>
                    </div>
                ) : (
                    <>
                        <p className="auth-subtitle">
                            Create an account to save and create your own recipes.
                        </p>
                        <form onSubmit={handleRegister}>

                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </div>

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
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>

                            <button type="submit">Register</button>

                        </form>
                    </>
                )}

                {!isRegistered && (
                    <p className="auth-link">
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                )}
            </div>
        </div>
    );
}

export default Register;