document.addEventListener('DOMContentLoaded', () => {
  let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  const recipeListDiv = document.getElementById('recipe-list');

  const displayRecipes = () => {
    recipeListDiv.innerHTML = '';  
    if (recipes.length === 0) {
      recipeListDiv.innerHTML = '<p class="no-recipes">No recipes found. Please submit a recipe first.</p>';
      return;
    }

    recipes.forEach(recipe => {
      const recipeCard = document.createElement('div');
      recipeCard.className = 'recipe-card';
      const title = document.createElement('h2');
      title.textContent = recipe.title;
      const ingredientsList = document.createElement('ul');
      recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
      });
      const instructionsList = document.createElement('ol');
      recipe.instructions.forEach(instruction => {
        const li = document.createElement('li');
        li.textContent = instruction;
        instructionsList.appendChild(li);
      });
      if (recipe.image) {
        const img = document.createElement('img');
        img.src = recipe.image;  
        img.alt = recipe.title;
        recipeCard.appendChild(img);
      }
      recipeCard.appendChild(title);
      recipeCard.appendChild(ingredientsList);
      recipeCard.appendChild(instructionsList);
      recipeListDiv.appendChild(recipeCard);
    });
  };

  displayRecipes();  
  
  document.getElementById('recipe-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const title = document.getElementById('recipe-title').value.trim();
    const ingredients = document.getElementById('recipe-ingredients').value.split(',').map(i => i.trim());
    const instructions = document.getElementById('recipe-instructions').value.split('.').map(i => i.trim()).filter(i => i !== "");
    const imageInput = document.getElementById('recipe-image');

    if (recipes.some(recipe => recipe.title.toLowerCase() === title.toLowerCase())) {
      document.getElementById('form-message').textContent = "Recipe title already exists. Please choose a different title.";
      return;
    }

    const newRecipe = {
      title: title,
      ingredients: ingredients,
      instructions: instructions,
    };

    if (imageInput.files && imageInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        newRecipe.image = e.target.result;  
        recipes.push(newRecipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        document.getElementById('form-message').textContent = "Recipe submitted successfully!";
        document.getElementById('recipe-form').reset();
        displayRecipes();  
      };
      reader.readAsDataURL(imageInput.files[0]);
    } else {
      recipes.push(newRecipe);
      localStorage.setItem('recipes', JSON.stringify(recipes));
      document.getElementById('form-message').textContent = "Recipe submitted successfully!";
      document.getElementById('recipe-form').reset();
      displayRecipes();  
    }
  });
});