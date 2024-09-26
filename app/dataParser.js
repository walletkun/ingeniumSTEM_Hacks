const fs = require('fs');
const logger = require('./utils/logger');
const getFilePath = require('./parsers/pathHandler'); // To handle file paths
const { processPDF } = require('./parsers/parser'); // Import parser function

// Main function to parse a PDF and save the extracted text
async function parseAndSavePDF(pdfPath = './test_parsing/deeplearningbook.org_contents_part_basics.html.pdf') {
    // NOTE: Default path is set for testing purposes; remove this default later.
    try {
        // Resolve the provided or default file path
        const filePath = getFilePath(pdfPath);
        logger.info(`Parsing file at path: ${filePath}`);

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

module.exports = parseAndSavePDF;