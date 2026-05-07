import { useEffect, useState } from "react";

function MyRecipes() {
    const [recipes, setRecipes] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        fetch("http://localhost:3001/recipes")
            .then((response) => response.json())
            .then((data) => {
                const publicRecipes = data.filter((recipe) => !recipe.userId);
                setRecipes(publicRecipes);
            })

        setRecipes(userRecipes);
    })
        .catch((error) => console.log(error));
}, []);

if (!currentUser) {
    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="error-box">
                    <h2>Access denied</h2>
                    <p>You need to be logged in to view your recipes.</p>
                </div>
            </div>
        </div>
    );
}

async function handleDelete(id) {
    await fetch(`http://localhost:3001/recipes/${id}`, {
        method: "DELETE"
    });

    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
}

return (
    <div className="page">
        <h1>My Recipes</h1>
        <p>Here you can see the recipes created by you.</p>

        {recipes.length === 0 ? (
            <p>You have not created any recipes yet.</p>
        ) : (
            <div className="recipes-grid">
                {recipes.map((recipe) => (
                    <div className="recipe-card" key={recipe.id}>
                        <img src={recipe.image} alt={recipe.title} />
                        <h2>{recipe.title}</h2>
                        <p>{recipe.description}</p>
                        <p><strong>Cooking time:</strong> {recipe.cookTime}</p>
                        <strong>Ingredients:</strong>
                        <ul>
                            {recipe.ingredients?.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                        <p><strong>Instructions:</strong> {recipe.instructions}</p>

                        <button onClick={() => handleDelete(recipe.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        )}
    </div>
);
}

export default MyRecipes;