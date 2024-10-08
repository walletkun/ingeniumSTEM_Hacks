/*
    Name: pdfExtractor.js
    Exports: PDFExtractor
    Description: Program accepts a file path, resolves path, uses pdfjsLib 
    to parse text data into a return variable.
*/

// Import required modules
import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist';
import path from 'path';

// Define PDFExtractor class for handling PDF text extraction
class PDFExtractor {

    // Method to extract text from a PDF file
    async extractText(filePath) {
        try {

            // Resolve the full path of the PDF file
            const fullPath = path.resolve(filePath);
            
            // Read the PDF file as a Uint8Array
            const data = new Uint8Array(await fs.promises.readFile(fullPath));
            
            // Load the PDF document using pdf.js
            const doc = await pdfjsLib.getDocument(data).promise;
            
            // Initialize an empty string to store the full text
            let fullText = '';
            
            // Iterate through each page of the PDF
            for (let i = 1; i <= doc.numPages; i++) {

                // Get the current page
                const page = await doc.getPage(i);
                
                // Extract text content from the page
                const content = await page.getTextContent();
                
                // Join all text items on the page into a single string
                const pageText = content.items.map(item => item.str).join(' ');
                
                // Append the page text to the full text, adding a newline
                fullText += pageText + '\n';
            }
            
            // Return the trimmed full text
            return fullText.trim();

            // If an error occurs, throw a new error with a descriptive message
        } catch (error) {
            // If an error occurs, throw a new error with a descriptive message
            throw new Error(`Failed to extract text from ${filePath}: ${error.message}`);
        }
    }

    // Method to extract text and save it to a file. Mostly for testing, can remove later.
    async extractAndSave(filePath, outputPath) {

        // Extract text from the PDF using above method.
        const text = await this.extractText(filePath);
        
        // Write the extracted text to the specified output file
        await fs.promises.writeFile(outputPath, text);
        
        // Return the extracted text
        return text;
    }
}

// Export the PDFExtractor class as the default export
export default PDFExtractor;


/*
    Code Works.
    Future plans: 
    Better error handling and logging.
    Caching.
    Parallel proccessing.
    Stream in files.
    Format return text better --> fix random spacing, preserve paragraph structure.
    Attach meta data throughout.
    Extract and interpret non text non image data like charts and tables.
    Extract and relay pdf structure.
    Detect images --> send to ai to describe images, return result to text.
    Implement queue system to handle multiple requests.
    Progress tracking?
    Input can change to file stream or buffer
    Return value can change to JSON with meta data at the top, and breaks apart text based on structure.
*/