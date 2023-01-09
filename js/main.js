
document.addEventListener("DOMContentLoaded", getCocktails);

const instArray = []
const nameArray = []
const ingArray = []
const measArray = []
let dIndex = 0

function getCocktails() {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;

    for(let i = 1; i <= 5; i++){
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          let drk = data.drinks[0];
          // populate the gallery images
          srcStr = `.gallery-item-${i}`
          document.querySelector(srcStr).src = drk.strDrinkThumb;

          // populate name and intructions arrays,
          // populate array of ingredients and measurement objects
          nameArray.push(drk.strDrink);
          instArray.push(drk.strInstructions);

          let ingObj = Object.keys(drk).filter(function(k) {
            return k.indexOf('strIngredient') == 0;
          }).reduce(function(newData, k) {
            newData[k] = drk[k];
            return newData;
          }, 
          {});

          let measObj = Object.keys(drk).filter(function(k) {
            return k.indexOf('strMeasure') == 0;
          }).reduce(function(newData, k) {
            newData[k] = drk[k];
            return newData;
          }, 
          {});

          //console.log(ingObj)   //check
          //console.log(measObj)  //check
          ingArray.push(ingObj)
          measArray.push(measObj)

          // Set current index for these arrays to the third (highlighted)
          // image in the carousel
          // refactor this?
          dIndex = 2;
          document.querySelector("h2").innerText = nameArray[dIndex];
          document.querySelector(".instructions").innerText = instArray[dIndex];

          updateIngredients();
        })
        .catch((err) => {
          console.log(`error ${err}`);
        });
    }
}

function updateIngredients() {
    // Get the <ul>
    // Check it for any <li> tags; if they exist, remove all.
    // Get the ingredient and meas objects at ingArray[dIndex]
    // and measArray[dIndex]
    // Loop through and if not undefined, add an <li> tag with the meas
    // ing values

    //check if ul does not have children

    let ul = document.querySelector("ul");

    // remove any previous <li> tags
    while(!(isEmpty("ul"))){
      ul.removeChild(ul.firstChild);
    }

    let ingObj = ingArray[dIndex];
    let measObj = measArray[dIndex];
    let measArr = []
    let ingArr = []

    for (const meas in measObj) {
      if ((measObj[meas] != undefined) && (measObj[meas] != "")){
        measArr.push(measObj[meas])
      }
    }

    for (const ing in ingObj) {
      if ((ingObj[ing] != undefined) && (ingObj[ing] != "")){
        ingArr.push(ingObj[ing])
      }
    }

    for (let i = 0; i < measArr.length; i++){
      let li = document.createElement("li");
      li.innerHTML = `${measArr[i]} ${ingArr[i]}`
      ul.appendChild(li);
    }
}

// Checks if selected element has children
function isEmpty(id) {
  return document.querySelector(id).innerHTML.trim() == ""
}

const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
  constructor(container, items, controls){
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }

  updateGallery(){
    this.carouselArray.forEach(el => {
      el.classList.remove('gallery-item-1');
      el.classList.remove('gallery-item-2');
      el.classList.remove('gallery-item-3');
      el.classList.remove('gallery-item-4');
      el.classList.remove('gallery-item-5');
    });

    this.carouselArray.slice(0, 5).forEach((el, i)=>{
      el.classList.add(`gallery-item-${i+1}`);
    });

    document.querySelector("h2").innerText = nameArray[dIndex];
    document.querySelector(".instructions").innerText = instArray[dIndex];
    updateIngredients();
  }

  setCurrentState(direction){
    if (direction.className == 'gallery-controls-previous'){
      this.carouselArray.unshift(this.carouselArray.pop());
      dIndex -= 1;

    }else{
      this.carouselArray.push(this.carouselArray.shift());
      dIndex += 1;
    }
    if(dIndex < 0) dIndex = 4
    else if(dIndex > 4) dIndex = 0

    this.updateGallery();
  }

  setControls() {
    this.carouselControls.forEach(control => {
      galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;
      document.querySelector(`.gallery-controls-${control}`).innerText = control;
    });
  }

  useControls(){
    const triggers = [...galleryControlsContainer.childNodes];
    triggers.forEach(control => {
      control.addEventListener('click', e => {
        e.preventDefault();
        this.setCurrentState(control);
      });
    });
  }

}

const mainCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

mainCarousel.setControls();
mainCarousel.useControls();