# D1 Conservation Clicker

A minimal TypeScript/Vite browser project with Deno checks and GitHub Pages deployment.

## Project Handoff

### App link

https://charlotteevee1.github.io/CMPM121-D1/

### Interaction

- Player clicks the potted plant button to increase the counter for Environment Level
- Environment Level acts as currency the player can use to buy upgrades from the shop. Upgrades increase the amount of Environment Level gained from each click, or automatically increase the Environment Level. Upgrades increase in price with each purchase
- The overarching amount of Environment Level points gained unlock animals and trees in the forest window

### Run/build instructions

- Clone the repository and download Deno
- Run **deno task setup** in the terminal
- Run **deno task dev** in terminal to view live changes in browser
- Make changes
- Run **deno task ci** to check formatting, lint, and TypeScript
- Run **deno task preview** to ensure the final build works properly
- Commit changes to GitHub

## Developer Handoff

### Navigation to Content

- Visual assets are inside src/assets/ directory with forest assets organized in the forest folder
- Appearance styles are located in styles.css
- main.ts contains creation of HTML elements and main game logic

### Shared Behavior

- createUpgrade() function handles rendering upgrades on screen and the behavior of upgrades (purchasing upgrades, price increases, and increasing planting power)
- updateCounters() function simultaneously updates the current Environment Level, total accumulated Environment Level, manual planting power, and automatic planting power. It calls updateVisibility() and updateBrightness() to update the visibility of forest layers to correspond with Environment Level thresholds and brightness of the shop buttons to correspond with affordability

### Revision Explanation with Commit Links

- Creating new upgrades was originally handled by calling a function for each upgrade, leading to a long list of function calls. This was revised so new upgrades are handled through an array and object data structure to improve readability and organization. A loop automatically calls createUpgrade() for each upgrade in the data structure and appends the headings for manual and automatic upgrades into the shop div so the upgrades and headings are ordered correctly on the display. This makes the creation of future category headings and upgrades simpler. The createUpgrade() function was reworked to work with passed upgrades directly instead of passing each upgrade's properties.
  - https://github.com/charlotteevee1/CMPM121-D1/commit/685c1cf9c5ceac78bdac03515ce47cf16a0d8bed
    - https://github.com/charlotteevee1/CMPM121-D1/commit/add3f9c901a81ff73807987c5713da1544aa6ed4
- Updating counters was originally done through multiple single lines instead of a centralized function. This was revised to
  - https://github.com/charlotteevee1/CMPM121-D1/commit/8450640456869836d503e6227a70d30eeca775fd

## Credits

Tooling adapted from the [CMPM 121 Fall 2026 S01 starter](https://github.com/ucsc-cmpm-121-f26/s01-starter/tree/8974888efb6537be82e8eb069db139ea885039da), which has no explicit repository license. No new license is assigned to that material. The D1 scaffold and original SVG were authored with OpenAI GPT-6 Astra assistance. Dependencies retain their respective licenses.

Documentation Used

- https://www.w3schools.com/
- https://developer.mozilla.org/en-US/

Art assets by Charlotte Boren
