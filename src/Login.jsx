function Login() {
    return (
        <div className="page">
            <h1>Login</h1>

            <form>
                <div>
                    <label>Email:</label><br />
                    <input type="email" />
                </div>

                <div>
                    <label>Password:</label><br />
                    <input type="password" />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;