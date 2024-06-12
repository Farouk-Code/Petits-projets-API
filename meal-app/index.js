const form = document.querySelector("form");
const input = document.querySelector("input");
const result = document.getElementById("result");
let meals = [];

async function fetchData(input) {
  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
    .then((res) => res.json())
    .then((data) => (meals = data.meals));
}

function displayMeals() {
  if (meals === null) {
    result.innerHTML = `<li>Aucun résultat trouvé</li>`;
  } else {
    while (meals.length % 3 != 0 && meals.length > 2) {
      meals.length--;
    }
    console.log(meals[0].strMeal);
    result.innerHTML = meals
      .map((meal) => {
        const ingredients = [];
        for (let i = 0; i < 21; i++) {
          if (meal[`strIngredient${i}`]) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            ingredients.push(`<li>${ingredient} - ${measure}</li>`);
          }
        }

        return `
          <li class="card">
          <h2>${meal.strMeal}</h2>
          <p>${meal.strArea}</p>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <ul>${ingredients.join("")}</ul>
          </li>
          `;
      })
      .join("");
  }
}
input?.addEventListener("input", (e) => {
  fetchData(e.target.value).then(() => displayMeals());
});

form?.addEventListener("submit", (e) => {
  e.preventDefault();
});
