import { useEffect, useState } from "react";

function MyRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(null);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        document.body.style.backgroundImage =
            "url('/src/assets/food4.png')";
    }, []);

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
    }, [currentUser?.id]);

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

    function openRecipe(recipe) {
        setSelectedRecipe(recipe);
        setIsEditing(false);

        setEditData({
            title: recipe.title,
            description: recipe.description,
            image: recipe.image,
            cookTime: recipe.cookTime,
            ingredients: recipe.ingredients.join("\n"),
            instructions: recipe.instructions
        });
    }

    function handleEditChange(event) {
        const { name, value } = event.target;

        setEditData({
            ...editData,
            [name]: value
        });
    }

    async function handleUpdate(event) {
        event.preventDefault();

        const updatedRecipe = {
            ...selectedRecipe,
            title: editData.title.trim(),
            description: editData.description.trim(),
            image: editData.image.trim(),
            cookTime: editData.cookTime.trim(),
            ingredients: editData.ingredients
                .split("\n")
                .map((ingredient) => ingredient.trim())
                .filter((ingredient) => ingredient !== ""),
            instructions: editData.instructions.trim()
        };

        const response = await fetch(
            `http://localhost:3001/recipes/${selectedRecipe.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedRecipe)
            }
        );

        const savedRecipe = await response.json();

        setRecipes(
            recipes.map((recipe) =>
                recipe.id === savedRecipe.id ? savedRecipe : recipe
            )
        );

        setSelectedRecipe(savedRecipe);
        setIsEditing(false);
    }

    async function handleDelete(id) {
        await fetch(`http://localhost:3001/recipes/${id}`, {
            method: "DELETE"
        });

        const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
        setRecipes(updatedRecipes);
        setSelectedRecipe(null);
        setIsEditing(false);
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
                        <div
                            className="recipe-card"
                            key={recipe.id}
                            onClick={() => openRecipe(recipe)}
                        >
                            <img src={recipe.image} alt={recipe.title} />
                            <h2>{recipe.title}</h2>
                            <p>{recipe.description}</p>
                            <p>
                                <strong>Cooking time:</strong> {recipe.cookTime}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {selectedRecipe && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button
                            className="close-btn"
                            onClick={() => {
                                setSelectedRecipe(null);
                                setIsEditing(false);
                            }}
                        >
                            x
                        </button>

                        {!isEditing && (
                            <button
                                className="edit-btn"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Recipe
                            </button>
                        )}

                        <img
                            src={selectedRecipe.image}
                            alt={selectedRecipe.title}
                        />

                        {!isEditing ? (
                            <>
                                <h2>{selectedRecipe.title}</h2>
                                <p>{selectedRecipe.description}</p>

                                <p>
                                    <strong>Cooking time:</strong>{" "}
                                    {selectedRecipe.cookTime}
                                </p>

                                <strong>Ingredients:</strong>
                                <ul>
                                    {selectedRecipe.ingredients?.map(
                                        (ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        )
                                    )}
                                </ul>

                                <p>
                                    <strong>Instructions:</strong>{" "}
                                    {selectedRecipe.instructions}
                                </p>
                            </>
                        ) : (
                            <form onSubmit={handleUpdate}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        required
                                        name="title"
                                        value={editData.title}
                                        onChange={handleEditChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        required
                                        name="description"
                                        value={editData.description}
                                        onChange={handleEditChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Image URL</label>
                                    <input
                                        required
                                        name="image"
                                        value={editData.image}
                                        onChange={handleEditChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Cooking time</label>
                                    <input
                                        required
                                        name="cookTime"
                                        value={editData.cookTime}
                                        onChange={handleEditChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Ingredients</label>
                                    <textarea
                                        required
                                        name="ingredients"
                                        value={editData.ingredients}
                                        onChange={handleEditChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Instructions</label>
                                    <textarea
                                        required
                                        name="instructions"
                                        value={editData.instructions}
                                        onChange={handleEditChange}
                                    />
                                </div>

                                <div className="edit-actions">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDelete(selectedRecipe.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                    <button type="submit">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyRecipes;