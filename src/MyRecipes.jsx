import { useEffect, useState } from "react";

function MyRecipes() {
    const [recipes, setRecipes] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        fetch("http://localhost:3001/recipes")
            .then((response) => response.json())
            .then((data) => {
                const userRecipes = data.filter(
                    (recipe) => recipe.userId === currentUser?.id
                );

                setRecipes(userRecipes);
            })
            .catch((error) => console.log(error));
    }, []);

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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyRecipes;