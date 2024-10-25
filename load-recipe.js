const urlParams = new URLSearchParams(window.location.search);
const recipeName = urlParams.get("recipe");

if (recipeName && recipes[recipeName]) {
    const recipe = recipes[recipeName];

    document.getElementById("recipe-title").innerText = recipe.title;
    document.getElementById("recipe-image").src = recipe.image;

    const ingredientsList = document.getElementById("recipe-ingredients");
    ingredientsList.innerHTML = ""; 
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement("li");
        li.innerText = ingredient;
        ingredientsList.appendChild(li);
    });

    const instructionsList = document.getElementById("recipe-instructions");
    instructionsList.innerHTML = ""; 
    recipe.instructions.forEach(instruction => {
        const li = document.createElement("li");
        li.innerText = instruction;
        instructionsList.appendChild(li);
    });
} else {
    document.getElementById("recipe-title").innerText = "Recipe Not Found";
}
