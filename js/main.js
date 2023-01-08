
document.addEventListener("DOMContentLoaded", getCocktails);

const instArray = []
const nameArray = []
let dIndex = 0

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
          nameArray.push(drk.strDrink);
          instArray.push(drk.strInstructions);
          dIndex = 2;
          document.querySelector("h2").innerText = nameArray[dIndex];
          document.querySelector(".instructions").innerText = instArray[dIndex];
        })
        .catch((err) => {
          console.log(`error ${err}`);
        });
    }
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
  }

  setCurrentState(direction){
    if (direction.className == 'gallery-controls-previous'){
      this.carouselArray.unshift(this.carouselArray.pop());
      dIndex -= 1;
      // nameArray.pop();
      // document.querySelector("h2").innerText = nameArray[2];
      // document.querySelector(".instructions").innerText = instArray[2];
    }else{
      this.carouselArray.push(this.carouselArray.shift());
      dIndex += 1;
      // nameArray.shift();
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

//check which 

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
exampleCarousel.useControls();