import { Link } from "react-router-dom";

function Register() {
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Register</h1>
                <p className="auth-subtitle">Create an account to save and create your own recipes.</p>

                <form>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" placeholder="Enter your name" />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Create a password" />
                    </div>

                    <button type="submit">Register</button>
                </form>

                <p className="auth-link">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;