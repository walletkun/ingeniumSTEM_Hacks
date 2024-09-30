<<<<<<< HEAD
=======
require('dotenv').config();


//with this it will fetch the api key from the env file
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});

>>>>>>> 6b80c8c85dcdc7ecaba13094af6ad5ee16fdf9fc
/*
 Name: openaiTutor.js
 Description: This progran sets up an openAI client.
 Can be used by passing in systemMessage, content, and query as string arguemets.
 Returns openAIs answer.
 Uses openAI key from .env file in root directory.
*/
// Required library from openai.
const OpenAI = require('openai');
// Allows for loading key from the .env
<<<<<<< HEAD
require('dotenv').config();

=======
>>>>>>> 6b80c8c85dcdc7ecaba13094af6ad5ee16fdf9fc
// Class initilizes openAI model and passes in desired prompt.
class OpenAITutor {
  // Initilizes openAI config with key and model settings.
  constructor(model = "gpt-4-turbo-preview") {

// Remove This line later. Insert key into ""
<<<<<<< HEAD
    const apiKey = ""
=======
    const myApiKey = process.env.OPENAI_API_KEY
>>>>>>> 6b80c8c85dcdc7ecaba13094af6ad5ee16fdf9fc
    
    // Fetch api key from .env.
// ADD BACK THIS LINE BACK IN WHEN WE FIX .env
    // const apiKey = process.env.OPENAI_API_KEY;

    // Create instance of openai, passing in apikey.
<<<<<<< HEAD
    this.openai = new OpenAI({ apiKey });
=======
    this.openai = new OpenAI({ apiKey: myApiKey });
>>>>>>> 6b80c8c85dcdc7ecaba13094af6ad5ee16fdf9fc
    // Passing in desired model.
    this.model = model;
  }

  // Passed arguements form prompt for api call. Returns response as string.
  async generateResponse(systemMessage, content, query) {
    try {
      // Prompt structure using passed arguements.
      const messages = [
        { role: "system", content: systemMessage },
        { role: "user", content: content },
        { role: "user", content: query }
      ];
      // Call on the api, passing the prompt and model and awaits response.
      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: messages
      });
      // Returns openAI's answer.
      // [0] indicates the first version of openAI's answer.
      // We can return an array of these instead to allow for multiple 'tries'.
      return response.choices[0].message.content.trim();
    // Detect and handle errors.
    } catch (error) {
      // Need to implement functionality from logger.js.
      return `An error occurred: ${error.message}`;
    }
  }
}

// This function is only for testing. REMOVE LATER.
// Usage Example
(async () => {
  // Initialize the OpenAITutor object.
  const tutor = new OpenAITutor();
  // Define system message, content, and query.
  const systemMessage = "You are a knowledgeable and helpful tutor in the given subject.";
<<<<<<< HEAD
  const content = "The content extracted from LLaMA model analysis goes here.";
=======
  const content = "What is the meaning of this AI Tutor?";
>>>>>>> 6b80c8c85dcdc7ecaba13094af6ad5ee16fdf9fc
  const query = "What are the main concepts of this content?";
  // Pass model systemMessage, content, and query. Save response.
  const response = await tutor.generateResponse(systemMessage, content, query);
  // Output response to terminal.
  console.log(response);
})();

/*
<<<<<<< HEAD
    Current concern: Fixing proccess.env.OPENAI_API_KEY 
=======
    Current concern: Fixing proccess.env.OPENAI_API_KEY  (Fixed)
>>>>>>> 6b80c8c85dcdc7ecaba13094af6ad5ee16fdf9fc
    It doesnt work for some reason. Need to write in key manully for now.
    To test: node openaiTutor.js

    notes: This program is intended to be used by a chatbox.js, flashcard.js, ect
    It is stateless so caller function will need to save all queries and answers in a string.

    Future plans:
    - Figure out why its sort of slow and how to speed it up.
    - Better error handling. Using logger.js maybe.
    - Let caller functions set respinse config variables like temperature, max_tokens, and n (number of completions).
<<<<<<< HEAD
    - Let caller function set apikey
=======
    - Let caller function set apikey  ---- user uses own api key?
>>>>>>> 6b80c8c85dcdc7ecaba13094af6ad5ee16fdf9fc
    - Let caller function set model
    - set up async queues to manage high traffic
    - implement caching
    - use google translate api to enable use with different langauges
    - post-proccessing of response?
    - validating responses?
*/