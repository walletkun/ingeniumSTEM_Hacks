import logger from '../utils/logger.js';
import pdf from 'pdf-parse';
import fs from 'fs';
import getBinaryData from './fileHandler.js';

// Function to extract text from binary PDF data
export async function extractTextFromPDF(pdfBinaryData) {
    try {
        const data = await pdf(pdfBinaryData);
        logger.info('Text extracted from PDF');
        return data.text;
    } catch (error) {
        logger.error(`Error extracting text from PDF: ${error.message}`);
        throw new Error(`Error extracting text from PDF: ${error.message}`);
    }
}

// Function to process the PDF and return the extracted text
export async function processPDF(pdfBinaryData) {
    try {
        const extractedText = await extractTextFromPDF(pdfBinaryData);
        logger.info('PDF processing completed successfully');
        return extractedText;
    } catch (error) {
        logger.error(`Error processing PDF: ${error.message}`);
        throw new Error(`Error processing PDF: ${error.message}`);
    }
}

// Get binary data from fileHandler
const pdfBinaryData = await getBinaryData();

// Error handling
if (!pdfBinaryData) {
    logger.error('ERROR: No PDF binary data provided.');
    process.exit(1);
}

// Process the binary data from the PDF and save extracted text
processPDF(pdfBinaryData).then((text) => {
    if (text) {
        fs.writeFileSync('parsed_text.txt', text);
        logger.info('Parsed text written to file parsed_text.txt');
    }
});