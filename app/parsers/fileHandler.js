// Required node.js modules
import fs from 'fs';
import logger from '../utils/logger.js'; // Use the logger for logging
import getFilePath from './pathHandler.js'; // Importing the getFilePath function

// Function to get binary data for any type of file
function getBinaryData() {
    try {
        const filePath = getFilePath(); // Call the getFilePath function
        logger.info(`Reading binary data from: ${filePath}`);
        
        // Get and return binary data
        const binaryData = fs.readFileSync(filePath);
        return binaryData;

    } catch (err) {
        logger.error(`Error reading file: ${err.message}`);
        throw new Error(`Error reading file: ${err.message}`);
    }
}

// Exporting the function as default
export default getBinaryData;