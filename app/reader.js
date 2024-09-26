const { processPDF } = require('./parsers/parser');
const analyzeTextWithLLaMA = require('./llamaModel');

async function runAnalysis() {
    try {
        // Get the parsed text from parser.js
        const parsedText = await processPDF();
        // Pass the parsed text to the LLaMA model for analysis
        await analyzeTextWithLLaMA(parsedText);
    } catch (error) {
        console.error(`Error in running analysis: ${error.message}`);
    }
}

runAnalysis();