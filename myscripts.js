const slides = document.querySelectorAll(".slide")
var counter = 0;
// console.log(slides)
slides.forEach(
  (slide, index) => {
    slide.style.left = `${index * 100}%`  //to slide left
  }           //we  can alse use top to scroll img vertically
)        //for that we also need to change tranlate x to y

const goPrev = () => {
  counter--
  if (counter < 0) {
    counter = slides.length-1;
  }
  slideImage()
}
// }
const goNext = () => {
  counter++
  if (counter > slides.length-1) {
    counter = 0;
  }

  slideImage()
}
// }

const slideImage = () => {
  slides.forEach(
    (slide) => {
      slide.style.transform = `translateX(-${counter * 100}%)`
    }
  )
}
