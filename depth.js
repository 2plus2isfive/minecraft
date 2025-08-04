async function loadDepthMap() {
  try {
    const blockResponse = await fetch("depth.json");
    const blockTypes = await blockResponse.json();

    const mapResponse = await fetch("depth.txt");
    const mapText = await mapResponse.text();

    const depthMapDiv = document.getElementById("depthMap");

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

      depthMapDiv.appendChild(layerDiv);
    });
  } catch (error) {
    console.error("Error loading depth map:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadDepthMap);
