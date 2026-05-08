import { useEffect, useState } from "react";

function Recipes() {

    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        document.body.style.backgroundImage =
            "url('/src/assets/food3.png')";
    }, []);

    useEffect(() => {
        fetch("http://localhost:3001/recipes")
            .then((response) => response.json())
            .then((data) => {
                const publicRecipes = data.filter(
                    (recipe) => !recipe.userId
                );

                setRecipes(publicRecipes);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="page">
            <h1>Recipes</h1>
            <p>Explore simple and delicious recipes.</p>

            <div className="recipes-grid">
                {recipes.map((recipe) => (
                    <div
                        className="recipe-card"
                        key={recipe.id}
                        onClick={() => setSelectedRecipe(recipe)}
                    >
                        <img src={recipe.image} alt={recipe.title} />
                        <h2>{recipe.title}</h2>
                        <p>{recipe.description}</p>
                        <p><strong>Cooking time:</strong> {recipe.cookTime}</p>
                    </div>
                ))}
            </div>
            {selectedRecipe && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button
                            className="close-btn"
                            onClick={() => setSelectedRecipe(null)}
                        >
                            x
                        </button>

                        <img src={selectedRecipe.image} alt={selectedRecipe.title} />

                        <h2>{selectedRecipe.title}</h2>
                        <p>{selectedRecipe.description}</p>

                        <p>
                            <strong>Cooking time:</strong> {selectedRecipe.cookTime}
                        </p>

                        <strong>Ingredients:</strong>
                        <ul>
                            {selectedRecipe.ingredients?.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>

                        <p>
                            <strong>Instructions:</strong> {selectedRecipe.instructions}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Recipes;