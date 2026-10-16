// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"

// Creating visual elements
import plant from "./assets/plant.PNG?no-inline";
import "./styles.css";

import daySky from "./assets/forest/daySky.PNG?no-inline";
import tree5 from "./assets/forest/tree5.PNG?no-inline";
import tree4 from "./assets/forest/tree4.PNG?no-inline";
import tree3 from "./assets/forest/tree3.PNG?no-inline";
import tree2 from "./assets/forest/tree2.PNG?no-inline";
import tree1 from "./assets/forest/tree1.PNG?no-inline";
import bear from "./assets/forest/bear.PNG?no-inline";
import deer from "./assets/forest/deer.PNG?no-inline";
import bushes from "./assets/forest/bushes.PNG?no-inline";
import berries from "./assets/forest/berries.PNG?no-inline";
import grass from "./assets/forest/grass.PNG?no-inline";
import bunny from "./assets/forest/bunny.PNG?no-inline";
import slug from "./assets/forest/slug.PNG?no-inline";
import raccoon from "./assets/forest/raccoon.PNG?no-inline";
import pond from "./assets/forest/pond.PNG?no-inline";
import duck from "./assets/forest/duck.PNG?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;

type ForestLayer = {
  src: string;
  type: string;
  name?: string;
  unlockAt?: number;
  element?: HTMLImageElement;
};

const dayLayers: ForestLayer[] = [
  { src: daySky, type: "background" },

  {
    src: tree5,
    type: "upgrade",
    name: "tree5",
    unlockAt: 10000,
  },
  {
    src: tree4,
    type: "upgrade",
    name: "tree4",
    unlockAt: 4200,
  },
  {
    src: tree3,
    type: "upgrade",
    name: "tree3",
    unlockAt: 1600,
  },
  {
    src: tree2,
    type: "upgrade",
    name: "tree2",
    unlockAt: 110,
  },
  {
    src: tree1,
    type: "upgrade",
    name: "tree1",
    unlockAt: 1,
  },

  {
    src: bear,
    type: "animal",
    name: "bear",
    unlockAt: 100000,
  },
  {
    src: deer,
    type: "animal",
    name: "deer",
    unlockAt: 17000,
  },

  { src: bushes, type: "background" },
  {
    src: berries,
    type: "upgrade",
    name: "berries",
    unlockAt: 27000,
  },
  { src: grass, type: "background" },

  {
    src: bunny,
    type: "animal",
    name: "bunny",
    unlockAt: 370,
  },
  {
    src: slug,
    type: "animal",
    name: "slug",
    unlockAt: 1000000,
  },
  {
    src: raccoon,
    type: "animal",
    name: "raccoon",
    unlockAt: 7000,
  },

  {
    src: pond,
    type: "upgrade",
    name: "pond",
    unlockAt: 950,
  },
  {
    src: duck,
    type: "animal",
    name: "duck",
    unlockAt: 3450,
  },
];

const heading = document.createElement("h1");
heading.textContent = "Conservation Clicker";

const mainButton = document.createElement("img");
mainButton.style.cursor = "pointer";
mainButton.id = "mainButton";
mainButton.src = plant;
mainButton.alt = "A small potted plant";
mainButton.width = 96;
mainButton.height = 96;

const counter = document.createElement("h2");
counter.textContent = "Environment Level: 0";

const manualCounter = document.createElement("p");
manualCounter.textContent = "Manual power: +1";

const autoCounter = document.createElement("p");
autoCounter.textContent = "Auto power: +0";

const message = document.createElement("p");
message.textContent =
  "Click to grow the forest! Nature appreciates your efforts. There are six animals to discover!";

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
  overallCount += manualAmount;
  updateCounters();
});

// Make button glow when hovered
mainButton.addEventListener("mouseover", () => {
  mainButton.style.filter = "brightness(120%)";
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
let overallCount = 0;

// Timer
let lastTime: number | null = null;

function animate(currentTime: number) {
  if (lastTime != null) {
    const deltaTime = currentTime - lastTime;

    if (autoAmount > 0) {
      const increment = (autoAmount * deltaTime) / 1000;
      count += increment;
      overallCount += increment;
      updateCounters();
    }
  }

  lastTime = currentTime;
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// Functions
function updateCounters() {
  counter.textContent = `Environment Level: ${Math.floor(count)}`;
  upgradeCounter.textContent = `Total Upgrades Bought: ${upgradeCount}`;
  manualCounter.textContent = `Manual planting power: +${manualAmount}`;
  autoCounter.textContent = `Auto planting power: +${autoAmount}`;

  updateVisibility();
  updateBrightness();
}

function updateBrightness() {
  for (const section of upgradeSections) {
    for (const item of section.upgrades) {
      if (item.element) {
        if (count >= item.cost) {
          item.element.style.filter = "brightness(100%)";
        } else {
          item.element.style.filter = "brightness(50%)";
        }
      }
    }
  }
}

function renderLayers(
  layers: ForestLayer[],
) {
  forestWindow.replaceChildren();

  for (const item of layers) {
    const layer = document.createElement("img");
    layer.src = item.src;
    layer.classList.add("background");

    forestWindow.append(layer);
    item.element = layer;
  }
}

function updateVisibility() {
  for (const item of dayLayers) {
    let unlockAt = 0;
    if (item.unlockAt !== undefined) {
      unlockAt = item.unlockAt;
    }
    if (item.element) {
      if (overallCount >= unlockAt) {
        item.element.style.visibility = "visible";
      } else {
        item.element.style.visibility = "hidden";
      }
    }
  }
}

renderLayers(dayLayers);
updateVisibility();

type Upgrade = {
  name: string;
  amount: number;
  cost: number;
  element?: HTMLParagraphElement;
};

type UpgradeSection = {
  title: string;
  type: string;
  upgrades: Upgrade[];
};

// Buying an upgrade will add to the current autoAmount
function createUpgrade(
  item: Upgrade,
  upgradeType: string,
) {
  const upgrade = document.createElement("p");
  upgrade.style.cursor = "pointer";
  upgrade.textContent = `${item.name} - ${item.cost}`;

  item.element = upgrade;
  shop.append(upgrade);

  upgrade.addEventListener("click", () => {
    if (item.cost <= count) {
      count -= item.cost;
      upgradeCount++;

      if (upgradeType == "auto") autoAmount += item.amount;
      else if (upgradeType == "manual") {
        manualAmount += item.amount;
      }

      //Doubling the price of upgrades
      item.cost = item.cost * 2;
      upgrade.textContent = `${item.name} - ${item.cost}`;

      updateCounters();
    }
  });
}

// Creates upgrade sections in the shop and fills them with upgrades
const upgradeSections: UpgradeSection[] = [
  {
    title: "-Manual Upgrades-",
    type: "manual",
    upgrades: [
      { name: "Packets of seeds (+1 power)", amount: 1, cost: 10 },
      { name: "Buckets of seeds (+2 power)", amount: 2, cost: 500 },
      { name: "Wheelbarrows of seeds (+5 power)", amount: 5, cost: 1000 },
      {
        name: "Swimming pools of seeds (+300 power)",
        amount: 300,
        cost: 10000,
      },
    ],
  },
  {
    title: "-Auto Upgrades-",
    type: "auto",
    upgrades: [
      { name: "Find volunteers (+5 power)", amount: 5, cost: 50 },
      { name: "Teach a forestry class (+10 power)", amount: 10, cost: 1000 },
      { name: "Start a nonprofit (+500 power)", amount: 500, cost: 15000 },
      {
        name: "Expand protected area (+1000 power)",
        amount: 1000,
        cost: 100000,
      },
    ],
  },
];

// Loop to run each upgrade through createUpgrade()
for (const section of upgradeSections) {
  const heading = document.createElement("h2");
  heading.textContent = section.title;
  shop.append(heading);

  for (const upgrade of section.upgrades) {
    createUpgrade(upgrade, section.type);
  }
}

updateBrightness();
