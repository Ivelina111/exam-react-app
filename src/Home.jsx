import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3001/recipes")
            .then((response) => response.json())
            .then((data) => setRecipes(data.slice(0, 3)))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="page">
            <div className="home-section">
                <h1>Welcome to</h1>
                <h2>Fork Around & Find Out</h2>

                <p>
                    Discover delicious recipes, save your favorites,
                    and share your own cooking ideas.
                </p>

                <button onClick={() => navigate("/recipes")}>
                    Explore Recipes
                </button>
            </div>

            <h2 className="featured-title">Featured Recipes</h2>

            <div className="recipes-grid">
                {recipes.map((recipe) => (
                    <div className="recipe-card" key={recipe.id}>
                        <img src={recipe.image} alt={recipe.title} />

                        <h2>{recipe.title}</h2>

                        <p>{recipe.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;