
// Useful node modules.
const pdf = require('pdf-parse');
const fs = require('fs');

// Function to extract text from binary PDF data
async function extractTextFromPDF(pdfBinaryData) {
    try {
        const data = await pdf(pdfBinaryData); 
        return data.text;
    } catch (error) {
        throw new Error(`Error extracting text from PDF: ${error.message}`);
    }
}

// Function to process the PDF and return the extracted text
async function processPDF(pdfBinaryData) {
    try {
        // Extract text from the binary PDF data
        const extractedText = await extractTextFromPDF(pdfBinaryData);
        console.log('Extracted Text:', extractedText);
        
        // Return the extracted text for further processing by other programs
        return extractedText;
    } catch (error) {
        console.error('Error processing PDF:', error);
    }
}

// Calls the file handler to get the binary data
const getBinaryData = require('./fileHandler'); 
const pdfBinaryData = getBinaryData();

// Error handling
if (!pdfBinaryData) {
    console.error("ERROR: No PDF binary data provided.");
    process.exit(1);
}

// Process the binary data from the PDF
processPDF(pdfBinaryData).then((text) => {
    // Export or save the extracted text for use by llamaProcessor.js
    fs.writeFileSync('parsed_text.txt', text);
    console.log('Parsed text written to file parsed_text.txt');
});