const express = require('express');
const cors = require("cors");

const app = express();
app.use(cors());

// Function to generate spiral layout coordinates
function spiralLayout(numPoints, startValue, increment, minRadius, maxRadius) {
    const coordinates = [];
    const angleStep = 2 * Math.PI / numPoints;
    for (let i = 0; i < numPoints; i++) {
        const radius = startValue + i * increment;
        const angle = i * angleStep;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        // Calculate bubble radius based on the position in the spiral
        const bubbleRadius = minRadius + (maxRadius - minRadius) * (i / numPoints);
        coordinates.push({ x, y, r: bubbleRadius });
    }
    return coordinates;
}

app.post('/api/bubble', (req, res) => {
    const numPoints = 10; // Number of bubbles
    const startValue = 10; // Starting value for XY coordinates
    const increment = 10; // Increment between successive XY values
    const minRadius = 5; // Minimum radius of the bubble
    const maxRadius = 20; // Maximum radius of the bubble
    const data = spiralLayout(numPoints, startValue, increment, minRadius, maxRadius);
    
    res.json(data);
});
app.listen(3014, () => {
    console.log('Server is running on port 3014');
});
