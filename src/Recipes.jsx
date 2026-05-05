import { useEffect, useState } from "react";

function Recipes() {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/recipes")
            .then((response) => response.json())
            .then((data) => setRecipes(data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="page">
            <h1>Recipes</h1>
            <p>Explore simple and delicious recipes.</p>

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

export default Recipes;