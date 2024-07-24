export default function lightenColor(color: string, factor: number) {
    // Parse the color value if it's a hex string
    let hexColor = color;
    if (color.startsWith("#")) {
      hexColor = color.slice(1);
    }
  
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(0, 2), 16);
    const g = parseInt(hexColor.slice(2, 4), 16);
    const b = parseInt(hexColor.slice(4, 6), 16);
  
    // Calculate the lightened RGB values
    const newR = Math.min(r + (255 - r) * factor, 255);
    const newG = Math.min(g + (255 - g) * factor, 255);
    const newB = Math.min(b + (255 - b) * factor, 255);
  
    // Convert back to hex
    const newHexColor = `#${Math.round(newR)
      .toString(16)
      .padStart(2, "0")}${Math.round(newG)
      .toString(16)
      .padStart(2, "0")}${Math.round(newB).toString(16).padStart(2, "0")}`;
  
    return newHexColor;
  }
  