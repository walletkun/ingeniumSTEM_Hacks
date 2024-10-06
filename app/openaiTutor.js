// Import environment variables from .env file
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

/*
 Name: openaiTutor.js
 Description: This program sets up an OpenAI client.
 Can be used by passing in systemMessage, content, and query as string arguments.
 Returns OpenAI's answer.
 Uses OpenAI key from .env file in root directory.
*/
// Import OpenAI library.
import OpenAI from 'openai';

// Class initializes OpenAI model and passes in desired prompt.
class OpenAITutor {
  // Initializes OpenAI config with key and model settings.
  constructor(model = "gpt-4-turbo-preview") {

    // Remove This line later. Insert key into ""
    const myApiKey = process.env.OPENAI_API_KEY
    
    // Fetch API key from .env.
    // ADD BACK THIS LINE BACK IN WHEN WE FIX .env
    // const apiKey = process.env.OPENAI_API_KEY;

    // Create instance of OpenAI, passing in API key.
    this.openai = new OpenAI({ apiKey: myApiKey });
    // Passing in desired model.
    this.model = model;
  }

  // Passed arguments form prompt for API call. Returns response as string.
  async generateResponse(systemMessage, content, query) {
    try {
      // Prompt structure using passed arguments.
      const messages = [
        { role: "system", content: systemMessage },
        { role: "user", content: content },
        { role: "user", content: query }
      ];
      // Call on the API, passing the prompt and model and awaits response.
      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: messages
      });
      // Returns OpenAI's answer.
      // [0] indicates the first version of OpenAI's answer.
      // We can return an array of these instead to allow for multiple 'tries'.
      return response.choices[0].message.content.trim();
    // Detect and handle errors.
    } catch (error) {
      // Need to implement functionality from logger.js.
      return `An error occurred: ${error.message}`;
    }
  }
}

// Export the OpenAITutor class for ES module usage.
export default OpenAITutor;

// This function is only for testing. REMOVE LATER.
/*
(async () => {
  // Initialize the OpenAITutor object.
  const tutor = new OpenAITutor();
  // Define system message, content, and query.
  const systemMessage = "You are a knowledgeable and helpful tutor in the given subject.";
  const content = "The content extracted from LLaMA model analysis goes here.";
  const query = "What are the main concepts of this content?";
  // Pass model systemMessage, content, and query. Save response.
  const response = await tutor.generateResponse(systemMessage, content, query);
  // Output response to terminal.
  console.log(response);
})();
*/


/*
    Current concern: Fixing process.env.OPENAI_API_KEY 
    It doesn't work for some reason. Need to write in key manually for now.
    To test: node openaiTutor.js

    Notes: This program is intended to be used by a chatbox.js, flashcard.js, etc.
    It is stateless so caller function will need to save all queries and answers in a string.

    Future plans:
    - Figure out why it's slow and how to speed it up.
    - Better error handling using logger.js maybe.
    - Let caller functions set response config variables like temperature, max_tokens, and n (number of completions).
    - Let caller function set API key.
    - Let caller function set model.
    - Set up async queues to manage high traffic.
    - Implement caching.
    - Use Google Translate API to enable use with different languages.
    - Post-processing of response?
    - Validating responses?
*/