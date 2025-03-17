// Hilfsfunktion, um ein Flip-Digit anhand seiner ID bequem abzufragen
function getDigitElements(id) {
  const digitElement = document.getElementById(id);
  return {
    foregroundTop: digitElement.querySelector(
      ".flip-clock__digit-value--foreground.flip-clock__digit-value--upper"
    ),
    foregroundBottom: digitElement.querySelector(
      ".flip-clock__digit-value--foreground.flip-clock__digit-value--lower"
    ),
    backgroundTop: digitElement.querySelector(
      ".flip-clock__digit-value--background.flip-clock__digit-value--upper"
    ),
    backgroundBottom: digitElement.querySelector(
      ".flip-clock__digit-value--background.flip-clock__digit-value--lower"
    ),
    flipCardForeground: digitElement.querySelector(
      ".flip-clock__card--foreground"
    ),
    currentValue: 0 // merkt sich den aktuell angezeigten Wert
  };
}

// Objekte für jede Ziffer
const hoursTens = getDigitElements("hours-tens");
const hoursOnes = getDigitElements("hours-ones");
const minutesTens = getDigitElements("minutes-tens");
const minutesOnes = getDigitElements("minutes-ones");

// Funktion, die den Flip für eine einzelne Ziffer durchführt
function flipDigit(digitObj, newValue) {
  // Nur flippen, wenn sich der Wert ändert
  if (digitObj.currentValue === newValue) return;

  // Neue Zahl in foregroundBottom und backgroundTop eintragen
  digitObj.foregroundBottom.textContent = newValue;
  digitObj.backgroundTop.textContent = newValue;

  // Flip auslösen
  digitObj.flipCardForeground.classList.add("flip");

  // Nach Ende der Transition ...
  const onFlipEnd = () => {
    digitObj.flipCardForeground.classList.add("no-transition");
    digitObj.flipCardForeground.classList.remove("flip");

    // Die obere Vorderseite und die untere Rückseite kriegen den neuen Wert
    digitObj.foregroundTop.textContent = newValue;
    digitObj.backgroundBottom.textContent = newValue;

    digitObj.currentValue = newValue;
    digitObj.flipCardForeground.removeEventListener("transitionend", onFlipEnd);
  };

  // Sicherstellen, dass die Transition sauber startet
  digitObj.flipCardForeground.classList.remove("no-transition");
  digitObj.flipCardForeground.addEventListener("transitionend", onFlipEnd);
}

// Liest die Uhrzeit aus und aktualisiert alle Ziffern
function updateClock() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();

  // Stunden und Minuten zerlegen
  const hTensVal = h < 10 ? "0" : Math.floor(h / 10);
  const hOnesVal = h % 10;
  const mTensVal = Math.floor(m / 10);
  const mOnesVal = m % 10;

  // Flip für jede Ziffer
  flipDigit(hoursTens, hTensVal);
  flipDigit(hoursOnes, hOnesVal);
  flipDigit(minutesTens, mTensVal);
  flipDigit(minutesOnes, mOnesVal);
}

// Beim Laden einmal die aktuelle Zeit anzeigen
updateClock();

// Dann jede Sekunde aktualisieren
setInterval(updateClock, 1000);
