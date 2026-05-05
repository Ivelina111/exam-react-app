import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "true"
    );

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );

    useEffect(() => {
        function updateNavbar() {
            setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
            setUser(JSON.parse(localStorage.getItem("user")));
        }

        window.addEventListener("storage", updateNavbar);

        return () => {
            window.removeEventListener("storage", updateNavbar);
        };
    }, []);

    function handleLogout() {
        localStorage.removeItem("isLoggedIn");

        setIsLoggedIn(false);
        setUser(null);

        navigate("/");
    }

    return (
        <nav>
            <div className="nav-left">
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/recipes">Recipes</NavLink>
            </div>
            <div className="nav-right">
                {isLoggedIn ? (
                    <>
                        <span className="user-name">Hello, {user?.name}</span>
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Register</NavLink>
                    </>
                )}
            </div>

        </nav>
    );
}

export default Navbar;