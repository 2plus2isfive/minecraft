async function loadLandscape() {
    try {
        const blockResponse = await fetch('blocks.json');
        const blockTypes = await blockResponse.json();

        const mapResponse = await fetch('landscape.txt');
        const mapText = await mapResponse.text();

        const landscapeDiv = document.getElementById('landscape');

        const lines = mapText.split('\n').filter(line => line.trim() !== '');

        lines.forEach(line => {
            const layerDiv = document.createElement('div');
            layerDiv.className = 'layer';

            const blocks = line.split(',').slice(0, 16);

            blocks.forEach(blockCode => {
                const blockType = blockTypes.blocks.find(b => b.code === blockCode.trim());
                if (blockType) {
                    const blockDiv = document.createElement('div');
                    blockDiv.className = `block ${blockType.class}`;
                    layerDiv.appendChild(blockDiv);
                }
            });

            landscapeDiv.appendChild(layerDiv);
        });
    } catch (error) {
        console.error('Error loading landscape:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadLandscape);

// This code works great! (cant figure out how the fuck i got this to work)