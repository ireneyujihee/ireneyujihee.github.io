console.log("theMessage");

const theBody = document.querySelector('body');
let theMain = document.querySelector('main');
let theButton = document.querySelector("button");

theButton.addEventListener("click", theyClicked);
function theyClicked() {
  console.log("clicked");
}

let btnBreakfast = document.querySelector("#breakfast");
let btnLunch = document.querySelector("#lunch");
let btnDinner = document.querySelector("#dinner");

btnBreakfast.addEventListener("click", () => {
  document.querySelector("#section1").scrollIntoView({ behavior: "smooth" });
});

btnLunch.addEventListener("click", () => {
  document.querySelector("#section2").scrollIntoView({ behavior: "smooth" });
});

btnDinner.addEventListener("click", () => {
  document.querySelector("#section3").scrollIntoView({ behavior: "smooth" });
});
