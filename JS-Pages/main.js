//Recipe API homepage https://spoonacular.com/food-api
//Recipe API key 7be06ed1dc724fc38a11ef37e6e88fbe
//Format add => &apiKey=7be06ed1dc724fc38a11ef37e6e88fbe at the end of url
// Example: https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples&apiKey=7be06ed1dc724fc38a11ef37e6e88fbe

//Nutrition API homepage https://www.edamam.com/
//Nutrition API ID a9218d64
//API key cc615f58e7a322c342185472560c8883
//URL example https://api.edamam.com/api/nutrition-data?app_id=a9218d64&app_key=cc615f58e7a322c342185472560c8883&nutrition-type=cooking&ingr=1%20cup%20of%20milk%2C%201%20tsp%20of%20vanilla%2C%204%20eggs
//last try
const recipes = document.getElementById('card-container')
//start()

//Event listener for search button
//Select button
window.onload=function() {

    const searchButton = document.getElementById('search-icon');
    searchButton.addEventListener("click", resultList);
}
//Take input from search and look up recipe by ingredient
function resultList(){
    let result = document.getElementById('ingredient-search').value.trim()
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${result}&apiKey=8fc5e4f09c3044ca947bc0fa0f15b01b`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
         return ingredientList(data)
     })
     .then(async ingredientsArray => {
        await Promise.all(ingredientsArray.map(ingredient => {
            return nutrition(ingredient);
        }))
        .then(calories => {
            const cardLists = document.querySelectorAll('.card-body');
            cardLists.forEach((card, i) => {
                const calText = `<div class="nutrition" id= "nutrition${i}" style="display:none">${calories[i]}</div>`
                card.innerHTML += calText;
            })
        });
     })
 }

//Function that will use result of search, loop through array and pull out information
function ingredientList(ingredient){
    let ingredients = [];
    document.querySelector('.card-container').innerHTML =`
    ${ingredient.map(function(food) {
        
        let html = ""
        let ingredientsInCard = [];
        food.missedIngredients.forEach(function(missed){
            html += `<li class="ingredient">${missed.original}</li>`
            ingredientsInCard.push(missed.original);
        })
        food.usedIngredients.forEach(function(used){
            html += `<li class="ingredient">${used.original}</li>`
            ingredientsInCard.push(used.original);
        })
    
        ingredients.push(ingredientsInCard);
        return `
    <div class="card">
        <div class="card-body">
            <img src="${food.image}" alt="" class="card-image"/>
            <h2 class="card-title">${food.title}</h2>
            <div class ="ingredients" style="display:none">
                <h3><u>Ingredients:</u></h3>
                <ul class="ingredients-list">${html}</ul>
            </div>
        </div>
        <button onclick="show(this)" class="card-button">Recipe Information</button>
        <button onclick="hide(this)" class="card-button">Hide</button>
    </div>`
    
    }).join('')}
    `
    return ingredients;
    console.log(ingredients)
}

async function nutrition(ingredient){
    let nutrients = ""
    let card = []
    console.log(ingredient)
    const response = await fetch(`https://api.edamam.com/api/nutrition-data?app_id=a9218d64&app_key=cc615f58e7a322c342185472560c8883&nutrition-type=cooking&ingr=${ingredient}`);
    const data = await response.json();
    console.log(data)
    //loop through total nutrients
    for(let nutrient in data.totalNutrients) {
        nutrients += `<li><strong>${data.totalNutrients[nutrient].label}</strong> - ${data.totalNutrients[nutrient].quantity.toFixed(1)}${data.totalNutrients[nutrient].unit}</li>`
    } 
        return `
        <h3><u><strong>Nutrition Info:</strong></u></h3>
            <ol class="nutrition-info">
                ${nutrients}
            </ol>
        `
}

async function show(button){
    $(button).siblings(".card-body").find(".nutrition").show()
    $(button).siblings(".card-body").find(".ingredients").show()
}

async function hide(button){
    $(button).siblings(".card-body").find(".nutrition").hide()
    $(button).siblings(".card-body").find(".ingredients").hide()
}

// Filter recipes on homescreen

function cuisineDropdown() {
    document.getElementById("dropList").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.getElementsByClassName("dropdown-list");
        //const i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// let modalBtn = document.querySelector('.modal-btn')
// let modalBg = document.querySelector('.modal-bg')
// let modalClose = document.querySelector('.modal-close')

// modalBtn.addEventListener('click',function(){
//     modalBg.classList.add('bg-active');
// })

// modalClose.addEventListener('click', function(){
//     modalBg.classList.remove('bg-active');
// })

//Filter recipes on homescreen


//Filter recipes on homescreen
