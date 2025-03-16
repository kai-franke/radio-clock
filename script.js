const topFlipCard = document.getElementById("topFlipCard");
const numberTop = document.querySelector(".number-one");
const numberBottom = document.querySelector(".number-two");
const numberVeryBottom = document.querySelector(".number-four");
const numberTopBackground = document.querySelector(".number-three");
const flipBtn = document.getElementById("flipBtn");

// Starte mit der Zahl, die aktuell oben steht (im Beispiel 4)
let currentNumber = parseInt(numberTop.textContent, 10);

// Klick-Event für den Button
flipBtn.addEventListener("click", () => {
  // Nächste Zahl berechnen (nach 9 kommt 0)
  let nextNumber = (currentNumber + 1) % 10;

  // Die "Rückseite" bekommt schon mal die nächste Zahl
  numberBottom.textContent = nextNumber;

  // Flip auslösen
  topFlipCard.classList.add("flip");

  // Nach Ende der Transition:
  // -> Obere Zahl aktualisieren, Flip-Klasse entfernen
  const onFlipEnd = () => {
    topFlipCard.style.transition = "none";
    topFlipCard.classList.remove("flip");

    numberTop.textContent = nextNumber;
    currentNumber = nextNumber;
    numberVeryBottom.textContent = nextNumber;
  };
  numberTopBackground.textContent = nextNumber;

  // Wenn die Flip-Animation fertig ist, setze den Text in der Front
  topFlipCard.addEventListener("transitionend", onFlipEnd);
  topFlipCard.style.transition =
    "transform 0.6s cubic-bezier(0.84, 0, 0.98, 0.56)";
});
