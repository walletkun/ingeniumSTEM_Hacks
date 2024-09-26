const path = require('path');

// Function to get the file path for the PDF
function getFilePath(pdfFilePath = null) {
    // If a file path is provided, use it; otherwise use a default path
    if (pdfFilePath) {
        return path.resolve(pdfFilePath); // Resolve to an absolute path
    } else {
        // Fallback to a default path if none is provided
        return path.join(__dirname, '../test_parsing/Compilers_Principles_Techniques_and_Tools_(2nd Edition).pdf');
    }
}

module.exports = getFilePath;