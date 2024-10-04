/*
    Flashcard Generation Program.
*/

// React module and pinecone/openAI imports.
import { queryPinecone } from './pinecone_operations/pinecone_retrieve';
import OpenAITutor from './openaiTutor';

// Constant string 'systemMessage' for flashcard generation in OpenAI.
const systemMessage = 
`Your role is to generate flashcards for the user based on a selected subject. Follow these guidelines:

Default Flashcard Generation:
If no specific requests are made by the user, generate flashcards based on your general knowledge of the selected subject.
If there are no specific requests by the user, by default, if a PDF document is uploaded, prioritize generating flashcards that capture key points, important keywords, insights, and essential information from the PDF’s analysis text file.

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
const FlashcardGenerator = async ({ flashcard_size, flashcard_diff, flashcard_topic, user_id, workspace_id }) => {
    // Construct query string based on props.
    const query = `Make a flashcard set of size ${flashcard_size} of difficulty ${flashcard_diff} on ${flashcard_topic}`;

    // Query Pinecone to fetch related content for flashcard generation.
    const pineconeResults = await queryPinecone(flashcard_topic, user_id, workspace_id);

    // Generate flashcards using OpenAI.
    const tutor = new OpenAITutor();
    const flashcardResponse = await tutor.generateResponse(systemMessage, pineconeResults, query);

    // Return the generated flashcards in the expected JSON format.
    return flashcardResponse.flashcards || [];
};

// Temporary test component for direct testing.
const FlashcardTester = async () => {
    // Mock data for testing.
    const flashcard_size = 10;
    const flashcard_diff = "medium";
    const flashcard_topic = "derivatives";
    const user_id = "user123";
    const workspace_id = "workspace456";

    // Generate flashcards using mock data.
    const generatedFlashcards = await FlashcardGenerator({
        flashcard_size,
        flashcard_diff,
        flashcard_topic,
        user_id,
        workspace_id
    });

    console.log("Generated Flashcards: ", generatedFlashcards);
};

// Export the FlashcardGenerator for use in the front end.
export { FlashcardGenerator };

// Export the FlashcardTester for testing purposes.
export default FlashcardTester;

/*
    Code has not yet been tested.



*/