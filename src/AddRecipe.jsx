import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddRecipe() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [cookTime, setCookTime] = useState("");

    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    async function handleAddRecipe(event) {
        event.preventDefault();

        const newRecipe = {
            title: title,
            description: description,
            image: image,
            ingredients: ingredients.split("\n").filter((item) => item.trim() !== ""),
            instructions: instructions,
            cookTime: cookTime,
            userId: currentUser.id
        };

        await fetch("http://localhost:3001/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRecipe)
        });

        navigate("/my-recipes");
    }

    if (!currentUser) {
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <div className="error-box">
                        <h2>Access denied</h2>
                        <p>You need to be logged in to add a recipe.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Add Recipe</h1>

                <p className="auth-subtitle">
                    Share your favorite recipe with the community.
                </p>

                <form onSubmit={handleAddRecipe}>
                    <div className="form-group">
                        <label>Recipe title</label>
                        <input
                            required
                            type="text"
                            placeholder="Example: Homemade Pizza"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            required
                            placeholder="Write a short description..."
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Image URL</label>
                        <input
                            required
                            type="url"
                            placeholder="Paste an image link"
                            value={image}
                            onChange={(event) => setImage(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Ingredients</label>
                        <textarea
                            required
                            placeholder={"Example:\neggs\nflour\nmilk"}
                            value={ingredients}
                            onChange={(event) => setIngredients(event.target.value)}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Instructions</label>
                        <textarea
                            required
                            placeholder="Describe how to prepare the recipe..."
                            value={instructions}
                            onChange={(event) => setInstructions(event.target.value)}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Cooking time</label>
                        <input
                            required
                            type="text"
                            placeholder="Example: 30 minutes"
                            value={cookTime}
                            onChange={(event) => setCookTime(event.target.value)}
                        />
                    </div>

                    <button type="submit">Add Recipe</button>
                </form>
            </div>
        </div>
    );
}

export default AddRecipe;