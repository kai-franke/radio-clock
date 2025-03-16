const flipButton = document.getElementById("flipButton");
const flipCardForeground = document.getElementById("flipCardForeground");
const numberForegroundTop = document.querySelector(".number-one");
const numberForegroundBottom = document.querySelector(".number-two");
const numberBackgroundTop = document.querySelector(".number-three");
const numberBackgroundBottom = document.querySelector(".number-four");

let currentNumber = parseInt(numberForegroundTop.textContent, 10);

flipButton.addEventListener("click", () => {
  let nextNumber = (currentNumber + 1) % 10; // Nächste Zahl berechnen (nach 9 kommt 0)
  numberForegroundBottom.textContent = nextNumber;
  numberBackgroundTop.textContent = nextNumber;

  console.log('before add flip')
  flipCardForeground.classList.add("flip"); // Flip auslösen

  // Nach Ende der Transition:
  const onFlipEnd = () => {
    console.log('onFlipEnd start')
    flipCardForeground.classList.add("no-transition"); // Transition für das Enfernen der .flip class deaktivieren
    flipCardForeground.classList.remove("flip");
    numberForegroundTop.textContent = nextNumber;
    numberBackgroundBottom.textContent = nextNumber;
    currentNumber = nextNumber;
    flipCardForeground.removeEventListener("transitionend", onFlipEnd);
    console.log('onFlipEnd end')
  };
  
  flipCardForeground.classList.remove("no-transition"); // Wieso kann das nicht innerhalb von onFlipEnd geschehen?
  console.log('before transitionend')
  flipCardForeground.addEventListener("transitionend", onFlipEnd);
});
