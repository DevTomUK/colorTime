/*
  Color Time
  Author: DevTomUK
  License: This code is provided under the MIT License.
  Please provide attribution to the original author when using this code.
*/

// SELECT YOUR CLASS NAME / ELEMENT PROPERTY INPUTS HERE:
    
  // CHANGE THIS VALUE TO PICK WHICH PROPERTY OF THE ELEMENT YOU WANT THE EFFECT TO WORK ON:
      propertyToChange = 'backgroundColor';
  // CHANGE THIS VALUE TO PICK WHICH CLASS OF ELEMENT THIS FUNCTION APPLIES TO:
      className = 'colorTime';

    
// This function converts the current time to an RGB value
  function updateBackgroundColor() {
      
    // Get the current time
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const milliseconds = currentTime.getMilliseconds();

    // Calculate a smooth color transition based on time
    const hue = (seconds * 1000 + milliseconds) / 60000 * 360; // Calculate hue (0-360 degrees)
    const rgbColor = hslToRgb(hue, 100, 50); // Convert hue to RGB

    // Apply the color to an element with the class .colorTime
    document.querySelector('.'+[className]).style[propertyToChange] = `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;
  }

// This function converts HSL color to RGB color
  function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

// Update the background color initially and start updating every 100 milliseconds (10 times per second)
  updateBackgroundColor();
  setInterval(updateBackgroundColor, 100); // Update every 100 milliseconds (10 times per second)