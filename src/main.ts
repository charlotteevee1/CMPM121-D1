// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"

// Creating visual elements
import tileUrl from "./assets/tile.svg?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "D1 project";

const image = document.createElement("img");
image.id = "buttonImg";
image.src = tileUrl;
image.alt = "A teal tile with a cream circle";
image.width = 96;
image.height = 96;

const message = document.createElement("p");
message.textContent = "Your project starts here.";

const counter = document.createElement("p");
counter.textContent = "Trees planted: 0";

const upgrade1 = document.createElement("p");
upgrade1.textContent = "Click here to increase multiplier to 2x";
upgrade1.id = "upgrade1";

// Make sure all visual elements are listed into here
app.append(heading, image, message, counter, upgrade1);

// Add click handler
const button = document.getElementById("buttonImg")!;
const upgrade1Button = document.getElementById("upgrade1")!;

// Variables
let count = 0;
let multiplier = 1;

// Functions
function increase(count: number, multiplier: number) {
  count += 1 * multiplier;
  counter.textContent = `Trees planted: ${count.toString()}`;
  return count;
}

// Event Listeners
button.addEventListener("click", () => {
  count = increase(count, multiplier);
});

// Testing a very basic upgrade
upgrade1Button.addEventListener("click", () => {
  multiplier = 2;
});

// Timer
function startTimer() {
  setInterval(() => {
    count = increase(count, multiplier);
  }, 1000);
}

startTimer();
