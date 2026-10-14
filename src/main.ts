// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"

// Creating visual elements
import tileUrl from "./assets/tile.svg?no-inline";
import "./styles.css";

const app = document.querySelector<HTMLElement>("#app")!;

const dayLayers = [
  { src: "./forest/daySky.PNG", type: "background" },

  { src: "./forest/tree5.PNG", type: "upgrade", name: "tree5" },
  { src: "./forest/tree4.PNG", type: "upgrade", name: "tree4" },
  { src: "./forest/tree3.PNG", type: "upgrade", name: "tree3" },
  { src: "./forest/tree2.PNG", type: "upgrade", name: "tree2" },
  { src: "./forest/tree1.PNG", type: "upgrade", name: "tree1" },

  { src: "./forest/bear.PNG", type: "animal", name: "bear" },
  { src: "./forest/deer.PNG", type: "animal", name: "deer" },

  { src: "./forest/bushes.PNG", type: "background" },
  { src: "./forest/berries.PNG", type: "upgrade", name: "berries" },
  { src: "./forest/grass.PNG", type: "background" },

  { src: "./forest/bunny.PNG", type: "animal", name: "bunny" },
  { src: "./forest/slug.PNG", type: "animal", name: "slug" },
  { src: "./forest/pond.PNG", type: "upgrade", name: "pond" },
  { src: "./forest/duck.PNG", type: "animal", name: "duck" },

  { src: "./forest/bell.PNG", type: "upgrade", name: "bell" },
];

const nightLayers = [
  { src: "./forest/nightSky.PNG", type: "background" },
  { src: "./forest/stars.PNG", type: "background" },

  { src: "./forest/tree5.PNG", type: "upgrade", name: "tree5" },
  { src: "./forest/tree4.PNG", type: "upgrade", name: "tree4" },
  { src: "./forest/tree3.PNG", type: "upgrade", name: "tree3" },
  { src: "./forest/tree2.PNG", type: "upgrade", name: "tree2" },
  { src: "./forest/tree1.PNG", type: "upgrade", name: "tree1" },

  { src: "./forest/wolf.PNG", type: "animal", name: "wolf" },
  { src: "./forest/fox.PNG", type: "animal", name: "fox" },

  { src: "./forest/bushes.PNG", type: "background" },
  { src: "./forest/berries.PNG", type: "upgrade", name: "berries" },
  { src: "./forest/grass.PNG", type: "background" },

  { src: "./forest/skunk.PNG", type: "animal", name: "skunk" },
  { src: "./forest/raccoon.PNG", type: "animal", name: "raccoon" },
  { src: "./forest/pond.PNG", type: "upgrade", name: "pond" },

  { src: "./forest/bell.PNG", type: "upgrade", name: "bell" },
  { src: "./forest/mystic.PNG", type: "animal", name: "mystic" },
];

const heading = document.createElement("h1");
heading.textContent = "Plant Trees";

const mainButton = document.createElement("img");
mainButton.style.cursor = "pointer";
mainButton.id = "mainButton";
mainButton.src = tileUrl;
mainButton.alt = "A teal tile with a cream circle";
mainButton.width = 96;
mainButton.height = 96;

const counter = document.createElement("h2");
counter.textContent = "Trees planted: 0";

const manualCounter = document.createElement("p");
manualCounter.textContent = "Manual power: +1";

const autoCounter = document.createElement("p");
autoCounter.textContent = "Auto power: +0";

const message = document.createElement("p");
message.textContent = "Keep clicking! Nature appreciates your efforts";

//number of upgrade counter
const upgradeCounter = document.createElement("h4");
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

nightLayers.forEach((item) => {
  const layer = document.createElement("img");
  layer.src = item.src;
  layer.classList.add("background");
  forestWindow.append(layer);
});

dayLayers.forEach((item) => {
  const layer = document.createElement("img");
  layer.src = item.src;
  layer.classList.add("background");
  forestWindow.append(layer);
});

// Make sure all visual elements are listed into here
app.append(clickWindow, forestWindow, shop);
shop.append(shopText, upgradeCounter);
clickWindow.append(
  heading,
  mainButton,
  counter,
  manualCounter,
  autoCounter,
  message,
);

// Event Listeners
mainButton.addEventListener("click", () => {
  count += manualAmount;
  updateCounters();
});

// Make button glow when hovered
mainButton.addEventListener("mouseover", () => {
  mainButton.style.filter = "brightness(150%)";
});

// Make button stop glowing when leaving
mainButton.addEventListener("mouseleave", () => {
  mainButton.style.filter = "brightness(100%)";
});

// Variables
let count = 0;
let upgradeCount = 0;
let autoAmount = 0;
let manualAmount = 1;

// Timer
function startTimer() {
  setInterval(() => {
    count += autoAmount;
    updateCounters();
  }, 1000);
}

startTimer();

// Functions
function updateCounters() {
  counter.textContent = `Trees planted: ${count}`;
  upgradeCounter.textContent = `Total Upgrades Bought: ${upgradeCount}`;
  manualCounter.textContent = `Manual power: +${manualAmount}`;
  autoCounter.textContent = `Auto power: +${autoAmount}`;
}

// Buying an upgrade will add to the current autoAmount
function createUpgrade(
  buttonText: string,
  newAmount: number,
  cost: number,
  upgradeType: string,
) {
  const upgrade = document.createElement("p");
  upgrade.style.cursor = "pointer";
  upgrade.textContent = `${buttonText} - $${cost}`;
  shop.append(upgrade);

  // Make button glow when hovered
  upgrade.addEventListener("mouseover", () => {
    if (cost <= count) {
      upgrade.style.filter = "brightness(150%)";
    }
  });

  // Make button stop glowing when leaving
  upgrade.addEventListener("mouseleave", () => {
    upgrade.style.filter = "brightness(100%)";
  });

  upgrade.addEventListener("click", () => {
    if (cost <= count) {
      count -= cost;
      upgradeCount++;

      if (upgradeType == "auto") autoAmount += newAmount;
      else if (upgradeType == "manual") {
        manualAmount += newAmount;
      }

      //Doubling the price of upgrades
      cost = cost * 2;
      upgrade.textContent = `${buttonText} - $${cost}`;

      updateCounters();

      console.log("Auto " + autoAmount + " Manual " + manualAmount);
    } else {
      console.log("Not enough cash!");
    }
  });
}

// Creates upgrade sections in the shop and fills them with upgrades
const upgradeSections = [
  {
    title: "-Manual Upgrades-",
    type: "manual",
    upgrades: [
      { name: "+1 manual", amount: 1, cost: 10 },
      { name: "+10 manual", amount: 10, cost: 50 },
      { name: "+100 manual", amount: 100, cost: 100 },
    ],
  },
  {
    title: "-Auto Upgrades-",
    type: "auto",
    upgrades: [
      { name: "+1 auto", amount: 1, cost: 100 },
      { name: "+10 auto", amount: 10, cost: 200 },
      { name: "+100 auto", amount: 100, cost: 300 },
    ],
  },
  {
    title: "-Environment Upgrades-",
    type: "environment",
    upgrades: [],
  },
];

for (const section of upgradeSections) {
  const heading = document.createElement("h2");
  heading.textContent = section.title;
  shop.append(heading);

  for (const upgrade of section.upgrades) {
    createUpgrade(
      upgrade.name,
      upgrade.amount,
      upgrade.cost,
      section.type,
    );
  }
}
