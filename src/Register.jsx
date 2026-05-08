import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    useEffect(() => {
        document.body.style.backgroundImage =
            "url('/src/assets/food7.png')";
    }, []);

    async function handleRegister(event) {
        event.preventDefault();

        const checkResponse = await fetch(`http://localhost:3001/users?email=${email}`);
        const existingUsers = await checkResponse.json();

        if (existingUsers.length > 0) {
            setError("User with this email already exists.");
            return;
        }

        const user = {
            name: name,
            email: email,
            password: password
        };

        const response = await fetch("http://localhost:3001/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        const createdUser = await response.json();

        localStorage.setItem("isLoggedIn", "true");
        const safeUser = {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email
        };

        localStorage.setItem("currentUser", JSON.stringify(safeUser));
        window.dispatchEvent(new Event("storage"));

        setIsRegistered(true);
        setError("");
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
                            {error && <p className="error-message">{error}</p>}

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