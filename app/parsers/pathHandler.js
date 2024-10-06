import path from 'path';
import { fileURLToPath } from 'url';

// Manually derive __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to get the file path for the PDF
function getFilePath(pdfFilePath = null) {
    // If a file path is provided, use it; otherwise use a default path
    if (pdfFilePath) {
        return path.resolve(pdfFilePath); // Resolve to an absolute path
    } else {
        // Fallback to a default path if none is provided
        const defaultPath = path.join(__dirname, '../test_parsing/deeplearningbook.org_contents_part_basics.html.pdf');
        console.log('Default Path:', defaultPath);
        return defaultPath;
    }
}

// Exporting the function as default
export default getFilePath;