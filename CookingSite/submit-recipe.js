document.getElementById('recipe-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission

    const title = document.getElementById('recipe-title').value.trim();
    const ingredients = document.getElementById('recipe-ingredients').value.split(',').map(i => i.trim());
    const instructions = document.getElementById('recipe-instructions').value.split('.').map(i => i.trim()).filter(i => i !== "");

    // Retrieve existing recipes or initialize as an empty array
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    console.log("Current recipes before submission:", recipes);  // Log current recipes before adding a new one

    // Check for duplicate title
    if (recipes.some(recipe => recipe.title.toLowerCase() === title.toLowerCase())) {
        document.getElementById('form-message').textContent = "Recipe title already exists. Please choose a different title.";
        return;
    }

    const newRecipe = {
        title: title,
        ingredients: ingredients,
        instructions: instructions
    };

    recipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));

    console.log("Recipes after saving new recipe:", JSON.parse(localStorage.getItem('recipes')));  // Log saved recipes

    document.getElementById('form-message').textContent = "Recipe submitted successfully!";
    
    // Redirect to the recipes page after a short delay
    setTimeout(() => {
        window.location.href = "your-recipes.html"; 
    }, 1000);
    
    document.getElementById('recipe-form').reset();
});