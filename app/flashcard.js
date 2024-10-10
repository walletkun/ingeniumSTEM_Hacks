/*
    Name: flashcard.js
    Exports: FlashCardGenerator
    Description: Creates flashcard set based on caller program specification.
    Recieves strings representing size, difficulty, topic, and user id and workspace id.
    Gets relevant content from pinecone based on user_id, workspace_id and query.
    Gets set from openAI in JSON format.
    Parse JSON to create array and returns array of flashcards.
*/

// React module and pinecone/openAI imports in ES module format.
import { queryPinecone } from "./pinecone_operations/pinecone_retrieve.js";
import OpenAITutor from "./openaiTutor.js";

// Constant string 'systemMessage' for flashcard generation in OpenAI.
const systemMessage = `Your role is to generate flashcards for the user based on a selected subject. Follow these guidelines:

Default Flashcard Generation:
If no specific requests are made by the user, generate flashcards based on your general knowledge of the selected subject.
If there are no specific requests by the user, by default, if a PDF document is uploaded, prioritize generating flashcards that capture key points, important keywords, insights, and essential information from the PDF analysis text file.

Handling User Requests:
Only generate flashcards if the user's request is relevant to the selected subject. If not, inform the user that the request must be related to the subject.
For relevant requests, generate flashcards based on the user's instructions, supplemented by your general knowledge of the subject and any PDF analysis (if available).
Example: If the user uploads a PDF of a calculus textbook and asks for flashcards on Chapter 3's main topics, generate flashcards only for that specific chapter's topics.

Request Precision:
If the user's request is clear and related, prioritize their instructions over the default generation process.
If the request is vague or unclear but still related, try your best to provide accurate flashcards. If the request is too unclear, ask the user for clarification before proceeding.

Consistent Subject Focus:
Ensure that all flashcards remain strictly relevant to the selected subject. If the user asks for unrelated content, prompt them to provide a subject-related request.

Return in the following JSON format:
{
   "flashcards": [
       {
           "front": "str",
           "back": "str"
       }
   ]
}`;

// Flashcard generation logic handling.
const FlashcardGenerator = async ({
  flashcard_size,
  flashcard_diff,
  flashcard_topic,
  user_id,
  workspace_id,
}) => {
  // Construct query string based on props.
  const query = `Make a flashcard set of size ${flashcard_size} of difficulty ${flashcard_diff} on ${flashcard_topic}`;

  let pineconeResults = "";
  //Adding aditional feature that we can allow user to input their own query.
  if (workspace_id) {
    try {
      // Query Pinecone to fetch related content for flashcard generation.
      pineconeResults = await queryPinecone(
        flashcard_topic,
        user_id,
        workspace_id
      );
    } catch (error) {
      console.error("Error querying Pinecone: ", error);
    }
  }

  // Generate flashcards using OpenAI.
  const tutor = new OpenAITutor();
  const flashcardResponse = await tutor.generateResponse(
    systemMessage,
    pineconeResults,
    query
  );

  let flashcards = [];
  try {
    const parsedResponse = JSON.parse(flashcardResponse);
    flashcards = parsedResponse.flashcards || [];
  } catch (error) {
    console.error("Error parsing OpenAI response: ", error);

    try {
      const jsonMatch = flashcardResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonPart = jsonMatch[0];
        const parsedJson = JSON.parse(jsonPart);
        flashcards = parsedJson.flashcards || [];
      }
    } catch (error) {
      console.error("Error parsing JSON from OpenAI response: ", error);
    }
  }
  if (flashcards.length === 0) {
    console.error(
      "Unable to parse flashcards from response. Raw response:",
      flashcardResponse
    );
  }
  // Return the generated flashcards in the expected JSON format.
  return flashcards;
};

// Temporary test component for direct testing. Remove later.
// const FlashcardTester = async () => {
//   // Mock data for testing.
//   const flashcard_size = 10;
//   const flashcard_diff = "medium";
//   const flashcard_topic = "quantum physics";
//   const user_id = "test_user";
//   const workspace_id = "test_workspace";

//   // Generate flashcards using mock data.
//   const generatedFlashcards = await FlashcardGenerator({
//     flashcard_size,
//     flashcard_diff,
//     flashcard_topic,
//     user_id,
//     workspace_id,
//   });

//   console.log("Generated Flashcards: ", generatedFlashcards);
// };

// Run test program. Remove later.
// FlashcardTester();

// Export the FlashcardGenerator for use in the front end.
export { FlashcardGenerator };

// Export the FlashcardTester for testing purposes. Remove later.
// export default FlashcardTester;

/*
    Code has been tested and works.
    Future plans:
    Allow for a variety of difficulty and include tags on each card for front end filtering.
    Change openAI implementation to allow for model setting. Flashcard.js can use 4o mini.
        We generally want to be able to send more parameters to set up openAI like temp nd what not.
        Except Im not sure if this can be done as well as a constant connection.
    Route to an ongoing openAI and pinecone conection so that result is quicker.
    Improve prompt.
    Imporve Error handling and logging.
    Implement filteration so that user does not voilate TOS.
    Implement translation from incoming requests and outgoing response (google-translate-api).
    Add validation for parameters.
    We may only need the text from pinecone and not annotations. We may need to change how retrieve_pinecone works 
        to allow for different types of requests.
    Generally we need to speed this proccess up.
    We can batch requests to openAI and parallel send them to front end. Maybe ask for 5/10 at a time?
    Make systemMessage more dynamic --> include user setup requests and log feedback to personalize creation.
    Refractor progrm for more seperation of concerns.
    





*/
