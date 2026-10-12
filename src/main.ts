// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"

// Creating visual elements
import tileUrl from "./assets/tile.svg?no-inline";
import leafeonUrl from "./assets/leafeon.jpg?no-inline";
import "./styles.css";

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "Plant Trees";

const mainButton = document.createElement("img");
mainButton.style.cursor = "pointer";
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

const counter = document.createElement("h2");
counter.textContent = "Trees planted: 0";

const message = document.createElement("p");
message.textContent = "Keep clicking! Nature appreciates your efforts";

//number of upgrade counter
const upgradeCounter = document.createElement("h3");
upgradeCounter.id = "upgradeCounter";
upgradeCounter.textContent = "Total Upgrades Bought: 0";

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
shop.append(shopText, upgradeCounter);
forestWindow.append(leafeon);
clickWindow.append(heading, mainButton, counter, message);

// Event Listeners
mainButton.addEventListener("click", () => {
  count += manualAmount;
  counter.textContent = `Trees planted: ${count.toString()}`;
});

// Variables
let count = 0;
let upgradeCount = 0;
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
  upgrade.style.cursor = "pointer";
  upgrade.textContent = buttonText;
  shop.append(upgrade);

  upgrade.addEventListener("click", () => {
    if (cost <= count) {
      count -= cost;
      upgradeCount++;

      if (isAutoUpgrade == true) autoAmount += newAmount;
      else manualAmount += newAmount;

      counter.textContent = `Trees planted: ${count.toString()}`;
      upgradeCounter.textContent =
        `Total Upgrades Bought: ${upgradeCount.toString()}`;
      console.log("Auto " + autoAmount + " Manual " + manualAmount);
    } else console.log("Not enough cash!");
  });
}

const autoUpgradeText = document.createElement("h2");
autoUpgradeText.textContent = "-Auto Upgrades-";
shop.append(autoUpgradeText);

createUpgrade("+1 auto - $10", 1, 10, true);

createUpgrade("+2 auto - $20", 2, 20, true);

createUpgrade("+10 auto - $100", 10, 100, true);

const manualUpgradeText = document.createElement("h2");
manualUpgradeText.textContent = "-Manual Upgrades-";
shop.append(manualUpgradeText);

createUpgrade("+5 manual - $30", 5, 30, false);

createUpgrade("+100 manual - $50", 100, 50, false);

createUpgrade("+200 manual - $80", 200, 80, false);

createUpgrade("+200 manual - $80", 200, 80, false);

const environmentUpgradeText = document.createElement("h2");
environmentUpgradeText.textContent = "-Environment Upgrades-";
shop.append(environmentUpgradeText);
