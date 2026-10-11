// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"

// Creating visual elements
import tileUrl from "./assets/tile.svg?no-inline";
import leafeonUrl from "./assets/leafeon.jpg?no-inline";
import "./styles.css";

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "Plant trees";

const mainButton = document.createElement("img");
mainButton.id = "mainButton";
mainButton.src = tileUrl;
mainButton.alt = "A teal tile with a cream circle";
mainButton.width = 96;
mainButton.height = 96;

// Placeholder image
const leafeon = document.createElement("img");
leafeon.id = "leafeon";
leafeon.src = leafeonUrl;
leafeon.alt = "A cute little leafeon!";

const counter = document.createElement("h3");
counter.textContent = "Trees planted: 0";

const message = document.createElement("p");
message.textContent = "Keep clicking! Nature appreciates your efforts";

const shopText = document.createElement("h1");
shopText.textContent = "Shop";

const shop = document.createElement("div");
shop.id = "shop";

const forestWindow = document.createElement("div");
forestWindow.id = "forestWindow";

const clickWindow = document.createElement("div");
clickWindow.id = "clickWindow";

// Make sure all visual elements are listed into here
app.append(clickWindow, forestWindow, shop);
shop.append(shopText);
forestWindow.append(leafeon);
clickWindow.append(heading, mainButton, counter, message);

// Event Listeners
mainButton.addEventListener("click", () => {
  count += manualAmount;
  counter.textContent = `Trees planted: ${count.toString()}`;
});

// Variables
let count = 0;
let autoAmount = 0;
let manualAmount = 1;

// Timer
function startTimer() {
  setInterval(() => {
    count = increase(count, autoAmount);
  }, 1000);
}

startTimer();

// Functions
function increase(count: number, autoAmount: number) {
  count += autoAmount;
  counter.textContent = `Trees planted: ${count.toString()}`;
  return count;
}

// Buying an upgrade will add to the current autoAmount
function createUpgrade(
  buttonText: string,
  newAmount: number,
  cost: number,
  isAutoUpgrade: boolean,
) {
  const upgrade = document.createElement("p");
  upgrade.textContent = buttonText;
  shop.append(upgrade);

  upgrade.addEventListener("click", () => {
    if (cost <= count) {
      count -= cost;

      if (isAutoUpgrade == true) autoAmount += newAmount;
      else manualAmount += newAmount;

      counter.textContent = `Trees planted: ${count.toString()}`;
      console.log("Auto " + autoAmount + " Manual " + manualAmount);
    } else console.log("Not enough cash!");
  });
}

createUpgrade("upgrade! +1 auto, cost 10", 1, 10, true);

createUpgrade("upgrade! +2 auto, cost 20", 2, 20, true);

createUpgrade("upgrade! +10 auto, cost 100", 10, 100, true);

createUpgrade("upgrade! +5 manual, cost 30", 5, 30, false);

createUpgrade("upgrade! +100 manual, cost 50", 100, 50, false);

createUpgrade("upgrade! +200 manual, cost 80", 200, 80, false);

createUpgrade("upgrade! +200 manual, cost 80", 200, 80, false);
