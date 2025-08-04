async function loadTransparentMap() {
  try {
    const blockResponse = await fetch("transparent.json");
    const blockTypes = await blockResponse.json();

    const mapResponse = await fetch("transparent.txt");
    const mapText = await mapResponse.text();

    const transparentDiv = document.getElementById("transparent");

    const lines = mapText.split("\n").filter((line) => line.trim() !== "");

    lines.forEach((line) => {
      const layerDiv = document.createElement("div");
      layerDiv.className = "layer";

      const blocks = line.split(",").slice(0, 16);

      blocks.forEach((blockCode) => {
        const blockType = blockTypes.blocks.find((b) => b.code === blockCode.trim());
        if (blockType) {
          const blockDiv = document.createElement("div");
          blockDiv.className = `block ${blockType.class}`;
          layerDiv.appendChild(blockDiv);
        }
      });

      transparentDiv.appendChild(layerDiv);
    });
  } catch (error) {
    console.error("Error loading transparent layer:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadTransparentMap);
