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

  digitObj.flipCardForeground.classList.remove("no-transition");
  digitObj.flipCardForeground.addEventListener("transitionend", onFlipEnd);
}

function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const hoursTensValue = hours < 10 ? "0" : Math.floor(hours / 10); /* Keine führende Null anzeigen */
  const hoursOnesValue = hours % 10;
  const minutesTensValue = Math.floor(minutes / 10);
  const minutesOnesValue = minutes % 10;

  flipDigit(hoursTens, hoursTensValue);
  flipDigit(hoursOnes, hoursOnesValue);
  flipDigit(minutesTens, minutesTensValue);
  flipDigit(minutesOnes, minutesOnesValue);
}

updateClock();

setInterval(updateClock, 1000);
