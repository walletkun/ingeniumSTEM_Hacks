/*
    This program gets and returns a file path.
    For now the filepath is declared directly.
    In the future this program should handle 
    files uploaded by users.
*/

// node.js module to handle paths (/ or \).
const path = require('path');

// Function to get the file path for the PDF
function getFilePath() {
    // Correct the file path
    const pdfFilePath = path.join(__dirname, '../test_parsing/deeplearningbook.org_contents_part_basics.html.pdf');
    return pdfFilePath;
}

module.exports = getFilePath;