const flipButton = document.getElementById("flipButton");
const flipCardForeground = document.querySelector(
  ".flip-clock__card--foreground"
);
const numberForegroundTop = document.querySelector(
  ".flip-clock__digit-value--foreground.flip-clock__digit-value--upper"
);
const numberForegroundBottom = document.querySelector(
  ".flip-clock__digit-value--foreground.flip-clock__digit-value--lower"
);
const numberBackgroundTop = document.querySelector(
  ".flip-clock__digit-value--background.flip-clock__digit-value--upper"
);
const numberBackgroundBottom = document.querySelector(
  ".flip-clock__digit-value--background.flip-clock__digit-value--lower"
);

let currentNumber = parseInt(numberForegroundTop.textContent, 10);

flipButton.addEventListener("click", () => {
  let nextNumber = (currentNumber + 1) % 10; // Nächste Zahl berechnen (nach 9 kommt 0)
  numberForegroundBottom.textContent = nextNumber;
  numberBackgroundTop.textContent = nextNumber;

  flipCardForeground.classList.add("flip"); // Flip auslösen

  // Nach Ende der Transition:
  const onFlipEnd = () => {
    flipCardForeground.classList.add("no-transition"); // Transition für das Enfernen der .flip class deaktivieren
    flipCardForeground.classList.remove("flip");
    numberForegroundTop.textContent = nextNumber;
    numberBackgroundBottom.textContent = nextNumber;
    currentNumber = nextNumber;
    flipCardForeground.removeEventListener("transitionend", onFlipEnd);
  };

  flipCardForeground.classList.remove("no-transition"); // Wieso kann das nicht innerhalb von onFlipEnd geschehen?
  flipCardForeground.addEventListener("transitionend", onFlipEnd);
});
