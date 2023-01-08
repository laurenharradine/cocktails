//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

// Listen out for a button click
const btn = document.querySelector("button");
btn.addEventListener("click", getCocktail);

function getCocktail() {
  const cocktail = document.querySelector("input").value.toLowerCase();
  // make sure the input field isn't blank
  if (cocktail !== "") {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // make sure that a valid cocktail name has been entered; 'drinks' will be null if invalid
        if (data.drinks != null) {
          // Go through array of drinks that have the input in its name to find the one we want.
          // e.g. 'Margarita' returns several variations of margaritas.
          for (i = 0; i < data.drinks.length; i++) {
            console.log(i);
            // If the name matches...
            if (data.drinks[i].strDrink.toLowerCase() === cocktail) {
              let drk = data.drinks[i];
              document.querySelector("h2").innerText = drk.strDrink;
              document.querySelector("img").src = drk.strDrinkThumb;
              document.querySelector("h3").innerText = drk.strInstructions;
            }
          }
        }
      })
      .catch((err) => {
        console.log(`error ${err}`);
      });
  }
}
