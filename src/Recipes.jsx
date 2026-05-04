function Recipes() {
    const recipes = [
        {
            id: 1,
            title: "Pasta Carbonara",
            description: "A simple Italian pasta recipe with eggs, cheese and bacon.",
            image: "https://home-design.bg/wp-content/uploads/2023/05/klasicheska-recepta-za-spageti-karbonara-4.webp"
        },
        {
            id: 2,
            title: "Pancakes",
            description: "Soft homemade pancakes, perfect for breakfast.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo-wpWoWqcDjKP7fR6B5jhKyflCkd__7EaMQ&s"
        },
        {
            id: 3,
            title: "Greek Salad",
            description: "Fresh salad with tomatoes, cucumber, olives and feta cheese.",
            image: "https://trapezata.net/media/k2/items/cache/5a61d31ed794cb758475f6c89477dfed_XL.jpg"
        },
        {
            id: 4,
            title: "Lasagna",
            description: "Classic Italian lasagna with layers of pasta, meat sauce and cheese.",
            image: "https://recipe-graphics.grocerywebsite.com/0_GraphicsRecipes/1391_4k.jpg"
        }
    ];

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