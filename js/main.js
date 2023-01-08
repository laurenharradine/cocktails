
document.addEventListener("DOMContentLoaded", getCocktails);

function getCocktails() {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;

    for(let i = 1; i <= 5; i++){
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          let drk = data.drinks[0];
          srcStr = `.gallery-item-${i}`
          //document.querySelector("h2").innerText = drk.strDrink;
          document.querySelector(srcStr).src = drk.strDrinkThumb;
          //document.querySelector("h3").innerText = drk.strInstructions;
        })
        .catch((err) => {
          console.log(`error ${err}`);
        });
    }
  
}