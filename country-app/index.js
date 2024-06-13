// @ts-nocheck
const inputSearch = document.getElementById("input-search");
const inputRange = document.getElementById("input-range");
const rangeValue = document.getElementById("range-value");
const minToMax = document.getElementById("min-to-max");
const maxToMin = document.getElementById("max-to-min");
const alphabetic = document.getElementById("alpha");
const allSortButtons = document.querySelectorAll(".btn-sort");
const countriesContainer = document.querySelector(".countries-container");
let dataCountries = [];
let sortButton = maxToMin;

const fetchCountries = async () => {
  await fetch("./countries.json")
    .then((res) => res.json())
    .then((data) => (dataCountries = data));

  countriesDisplay();
};

const countriesDisplay = () => {
  countriesContainer.innerHTML = dataCountries
    .filter((country) => {
      return country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase());
    })
    .sort((a, b) => {
      let result = b.population - a.population;
      switch (sortButton) {
        case maxToMin:
          result = b.population - a.population;
          break;

        case minToMax:
          result = a.population - b.population;
          break;

        case alphabetic:
          result = a.translations.fra.common.localeCompare(
            b.translations.fra.common
          );
          break;

        default:
          result = b.population - a.population;
          break;
      }
      return result;
    })
    .slice(0, inputRange.value)
    .map((country) => {
      return `
      <div class="card">
        <img src="${country.flags.svg}" alt="Drapeau ${
        country.translations.fra.common
      }">
        <h2>${country.translations.fra.common}</h2>
        <h4>${country.capital}</h4>
        <p>Population : ${country.population.toLocaleString()}</p>
      </div>
    `;
    })
    .join("");
};

window.addEventListener("load", fetchCountries);
inputSearch.addEventListener("input", countriesDisplay);

inputRange.addEventListener("input", () => {
  rangeValue.textContent = inputRange.value;
  countriesDisplay();
});

for (const button of allSortButtons) {
  button.addEventListener("click", (e) => {
    switch (e.target.id) {
      case "min-to-max":
        sortButton = minToMax;
        countriesDisplay();
        break;

      case "max-to-min":
        sortButton = maxToMin;
        countriesDisplay();
        break;

      case "alpha":
        sortButton = alphabetic;
        countriesDisplay();
        break;

      default:
        sortButton = maxToMin;
        countriesDisplay();
        break;
    }
  });
}
