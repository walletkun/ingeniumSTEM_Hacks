import fs from 'fs';
import logger from './utils/logger.js';
import getFilePath from './parsers/pathHandler.js'; // To handle file paths
import { processPDF } from './parsers/parser.js'; // Import parser function

// Main function to parse a PDF and save the extracted text
export async function parseAndSavePDF(pdfPath = './test_parsing/deeplearningbook.org_contents_part_basics.html.pdf') {
    try {
        // Resolve the provided or default file path
        const filePath = getFilePath(pdfPath);
        console.log('Resolved Path:', filePath); // Log the resolved path
        logger.info(`Parsing file at path: ${filePath}`);

        // Check if file exists before attempting to process
        if (!fs.existsSync(filePath)) {
            throw new Error(`File does not exist at path: ${filePath}`);
        }

        // Process the PDF and get the parsed text
        const parsedText = await processPDF(filePath);

        // Save the parsed text to a .txt file
        const outputPath = './parsed_text.txt';
        fs.writeFileSync(outputPath, parsedText);
        logger.info(`Parsed text saved to: ${outputPath}`);
    } catch (error) {
        logger.error(`Error in parsing and saving PDF: ${error.message}`);
    }
}

// Call this function directly for testing
parseAndSavePDF();