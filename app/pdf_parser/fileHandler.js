// Required node.js modules.
const fs = require('fs');
const getFilePath = require('./pathHandler'); // Importing the getFilePath function

// Function to get binary data for any type of file.
function getBinaryData() {
    try {
        const filePath = getFilePath(); // Call the getFilePath function
        console.log(`Reading binary data from: ${filePath}`);
        
        // Get and return binary data.
        const binaryData = fs.readFileSync(filePath);
        return binaryData;

    } catch (err) {
        console.error("Error reading file:", err);
        return null;
    }
}

// Exporting the function
module.exports = getBinaryData;