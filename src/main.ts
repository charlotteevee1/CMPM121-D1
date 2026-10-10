// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"

// Creating visual elements
import tileUrl from "./assets/tile.svg?no-inline";
import "./styles.css";

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "D1 project";

const mainButton = document.createElement("img");
mainButton.id = "mainButton";
mainButton.src = tileUrl;
mainButton.alt = "A teal tile with a cream circle";
mainButton.width = 96;
mainButton.height = 96;

const message = document.createElement("p");
message.textContent = "Your project starts here.";

const counter = document.createElement("p");
counter.textContent = "Trees planted: 0";

const shop = document.createElement("div");
shop.id = "shop";

// Make sure all visual elements are listed into here
app.append(heading, mainButton, message, counter, shop);

// Timer
function startTimer() {
  setInterval(() => {
    count = increase(count, multiplier);
  }, 1000);
}

startTimer();

// Variables
let count = 0;
let multiplier = 1;

// Event Listeners
mainButton.addEventListener("click", () => {
  count = increase(count, multiplier);
});

// Functions
function increase(count: number, multiplier: number) {
  count += 1 * multiplier;
  counter.textContent = `Trees planted: ${count.toString()}`;
  return count;
}

// Buying an upgrade will add to the current multiplier
function createUpgrade(
  buttonText: string,
  newMultiplier: number,
  cost: number,
) {
  const upgrade = document.createElement("p");
  upgrade.textContent = buttonText;
  shop.append(upgrade);

  upgrade.addEventListener("click", () => {
    if (cost <= count) {
      multiplier += newMultiplier;
      count -= cost;
      console.log(multiplier);
    } else console.log("Not enough cash!");
  });
}

createUpgrade("upgrade! x2. cost 20", 2, 20);

createUpgrade("upgrade! x100 cost 100", 100, 100);
