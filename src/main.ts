// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/tile.svg?no-inline";

function increase(count: number, multiplier: number) {
  return count += 1 * multiplier;
}

// Simple counter
let count = 0;
const multiplier = 1;

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

app.append(heading, image, message, counter);

// Add click handler
const button = document.getElementById("buttonImg")!;

button.addEventListener("click", () => {
  count = increase(count, multiplier);
  counter.textContent = `Trees planted: ${count.toString()}`;
});

function startTimer() {
  setInterval(() => {
    count = increase(count, multiplier);
    counter.textContent = `Trees planted: ${count.toString()}`;
    console.log("timer");
  }, 1000);
}

startTimer();

// Put the update text into a function instead of copy and pasted
