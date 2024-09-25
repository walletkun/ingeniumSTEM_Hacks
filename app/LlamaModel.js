require('dotenv').config();
const axios = require('axios');

// Test sending data to LLaMA API
async function testLLaMA() {
    const text = "This is a test input to the LLaMA model.";

    try {
        const response = await axios.post(
            'https://llama-api-url/parse', // Replace with your actual LLaMA API endpoint
            { text: text },
            { headers: { 'Authorization': `Bearer ${process.env.LLAMA_API_KEY}` } } // Using LLaMA API key from .env
        );

        console.log('LLaMA Response:', response.data);
        return response.data;

    } catch (error) {
        console.error('Error with LLaMA API:', error.message);
    }
}

// Run the test
testLLaMA();