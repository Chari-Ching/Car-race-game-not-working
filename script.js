// Get the canvas and context
const canvas = document.getElementById("raceCanvas");
const ctx = canvas.getContext("2d");

// Load car images
const car1Img = new Image();
const car2Img = new Image();
let imagesLoaded = 0; // Track image loading

car1Img.src = "./Car1.jpg"; // Ensure path is correct
car2Img.src = "./car2.jpg"; // Ensure path is correct

// Car properties
let car1 = { x: 0, y: 100, speed: 2 };
let car2 = { x: 0, y: 200, speed: 2 };
let raceInProgress = false;

// Increase imagesLoaded count when each image loads
car1Img.onload = checkImagesLoaded;
car2Img.onload = checkImagesLoaded;

function checkImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === 2) { // Only enable the button when both images are loaded
        document.getElementById("startButton").disabled = false;
    }
}

// Start button event
document.getElementById("startButton").addEventListener("click", startRace);

function startRace() {
    if (raceInProgress) return; // Prevent starting multiple races at once
    raceInProgress = true;
    car1.x = 0;  // Reset car positions
    car2.x = 0;
    car1.speed = 2 + Math.random(); // Randomize speed slightly
    car2.speed = 2 + Math.random();
    requestAnimationFrame(updateRace); // Start the animation
}

function updateRace() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // Draw cars
    ctx.drawImage(car1Img, car1.x, car1.y, 100, 50);
    ctx.drawImage(car2Img, car2.x, car2.y, 100, 50);

    // Update positions
    car1.x += car1.speed;
    car2.x += car2.speed;

    // Check for winner
    if (car1.x + 100 >= canvas.width) {
        raceInProgress = false;
        alert("Car 1 wins!");
    } else if (car2.x + 100 >= canvas.width) {
        raceInProgress = false;
        alert("Car 2 wins!");
    } else {
        requestAnimationFrame(updateRace); // Continue the race
    }
}
console.log("Car1 loaded", car1Img.src);
console.log("Car2 loaded", car2Img.src);
