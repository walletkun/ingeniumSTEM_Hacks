const pdf = require('pdf-parse');
const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

// Function to extract text from the PDF, handling both file paths and binary data
async function extractTextFromPDF(pdfData, isBinary = false) {
    let dataBuffer;
    
    // Check if the data is binary or a file path
    if (isBinary) {
        dataBuffer = pdfData; // Binary data is passed directly
    } else {
        dataBuffer = fs.readFileSync(pdfData); // pdfData is a file path
    }

    try {
        const data = await pdf(dataBuffer);
        return data.text;
    } catch (error) {
        throw new Error(`Error extracting text from PDF: ${error.message}`);
    }
}

// Pinecone and OpenAI API setup
async function sendToLLaMA(text) {
    try {
        const response = await axios.post(
            'https://llama-api-url/parse', // Adjust this to match your actual LLaMA API
            { text: text },
            { headers: { 'Authorization': `Bearer ${process.env.LLAMA_API_KEY}` } }
        );
        console.log('LLaMA Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error with LLaMA API:', error.message);
    }
}

// Pinecone vector store setup (mocked for this version)
async function upsertToPinecone(indexName, text) {
    console.log(`Upserting text to Pinecone index: ${indexName}`);
    return {
        indexName,
        text,
    };
}

// Function to generate a response from OpenAI
async function generateResponse(query, context) {
    try {
        const completion = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4', // Change this if you're using a different model
                messages: [
                    {
                        role: "system",
                        content: "You are a knowledgeable AI tutor. Use the provided context to answer the question."
                    },
                    {
                        role: "user",
                        content: `Context:\n${context}\n\nQuestion: ${query}\n\nAnswer:`
                    }
                ]
            },
            {
                headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` }
            }
        );
        return completion.data.choices[0].message.content;
    } catch (error) {
        console.error('Error with OpenAI API:', error.message);
    }
}

// Process the PDF and handle the RAG process
async function processPDF(pdfData, isBinary = false) {
    try {
        // Extract text from the PDF
        const extractedText = await extractTextFromPDF(pdfData, isBinary);
        console.log('Extracted Text:', extractedText);

        // Upsert text into Pinecone
        const indexName = 'ai-tutor';
        const upsertedData = await upsertToPinecone(indexName, extractedText);

        // Simulate a query and generate a response using the RAG pipeline
        const query = "Can you give me a summary of this PDF?";
        const response = await generateResponse(query, upsertedData.text);
        console.log('AI Response:', response);
    } catch (error) {
        console.error('Error processing PDF:', error);
    }
}

// Calls the file handler to get the binary data
const getBinaryData = require('./fileHandler'); 
const pdfBinaryData = getBinaryData();

// Error handling.
if (!pdfBinaryData) {
    console.error("ERROR: No PDF binary data provided.");
    process.exit(1);
}

// Process the PDF with binary data
processPDF(pdfBinaryData, true); // `true` indicates that binary data is being passed