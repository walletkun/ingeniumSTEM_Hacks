/*
    Name: practice_test.js
    Exports: TestGenerator
    Description: Creates a practice test in JSON format based on user specification.
    Takes in parameters on difficulty, number of different question types, and content.
    Queries pinecone for relevant content.
    Gets JSON format test from openAI and returns JSON.
*/
// React module and pinecone/openAI imports in ES module format.
import { queryPinecone } from './pinecone_operations/pinecone_retrieve.js';
import OpenAITutor from './openaiTutor.js';

// Constant string 'systemMessage' for practice test generation in openAI.
const systemMessage = `
You are a helpful assistant tasked with generating practice tests based on the provided input. The input will be analyzed data from an uploaded PDF document. 

### Task Instructions:
1. **Question Types**: Generate a practice test that includes a specified number of:
   - Multiple-choice questions
   - Short-answer questions
   - True/False questions

2. **Content Relevance**: Each question must be relevant to the content analyzed from the uploaded document. Ensure that:
   - The multiple-choice questions contain exactly 4 options, with only one correct answer.
   - Short-answer questions provide clear and concise answers.
   - True/False questions present statements that are directly tied to the content.

3. **User Specifications**: 
   - The user will specify how many of each type of question to generate. Follow these specifications strictly.
   - If the user request is vague, generate a balanced test with an equal distribution of question types.

4. **Difficulty**: 
   - The user will specify how difficult the exam should be on a scale of 1 - 5.
   - If the user request is vague, generate a balanced test with an equal distribution of difficulty types.

### Output Format:
Return the generated practice test in the following JSON format:

{
  "practice_test": {
    "title": "Test Title",
    "questions": [
      {
        "question_type": "multiple_choice",
        "question": "What is the capital of France?",
        "options": ["Berlin", "Madrid", "Paris", "Rome"],
        "correct_answer": "Paris"
      },
      {
        "question_type": "short_answer",
        "question": "Explain the significance of the Treaty of Versailles.",
        "correct_answer": "The Treaty of Versailles was a peace treaty that ended World War I, imposing heavy reparations and territorial losses on Germany."
      },
      {
        "question_type": "true_false",
        "question": "The Treaty of Versailles was signed in 1919.",
        "correct_answer": true
      }
    ]
  }
}`;

// Practice Test generation logic.
const TestGenerator = async ({test_diff, number_mc, number_short_answer, number_truefalse, test_topic, user_id, workspace_id }) => {

    // Construct query based on props.
    const query = `
    Make a practice test of difficulty ${test_diff} with:
    - ${number_mc} multiple choice questions
    - ${number_short_answer} short answer questions
    - ${number_truefalse} true/false questions
    Based on the topic: ${test_topic}.`;

    // Query Pinecone to fetch related content for flashcard generation.
    const pineconeResults = await queryPinecone(test_topic, user_id, workspace_id);

    // Generate test using OpenAI.
    const tutor = new OpenAITutor();
    const testResponse = await tutor.generateResponse(systemMessage, pineconeResults, query);    

    // Return the generated test in the expected JSON format.
    return testResponse;
}

// Test function to verify TestGenerator functionality. REMOVE LATER.
const GeneratorTest = async () => {
    // Sample input parameters
    const testParams = {
        test_diff: 3, // Difficulty level (1-5)
        number_mc: 2, // Number of multiple choice questions
        number_short_answer: 1, // Number of short answer questions
        number_truefalse: 1, // Number of true/false questions
        test_topic: "Roman History", // Topic for the questions
        user_id: "test_user", // Example user ID
        workspace_id: "test_workspace" // Example workspace ID
    };

    // Call TestGenerator with sample parameters
    const generatedTest = await TestGenerator(testParams);

    // Output the generated test to the console
    console.log("Generated Practice Test:", JSON.stringify(generatedTest, null, 2));
};

// Run test program. Remove later.
GeneratorTest(); // Just call the function without parentheses after declaration

// Export testGenerator for use in front end.
export { TestGenerator };

// Export the default GeneratorTest for testing purposes. Remove later.
export default GeneratorTest;

/*
    Code works.
    Future plans:
    Better error handling and logging.
    Validating parameters.
    Filtering content for TOS purposes.
    Translation in and out.
    Refractor for seperation of concerns.
    Play with prompt.
    Want to use a config file to store all systemMessages so that it doesnt clutter code.
    Type script for type safety?
    Allow for dynamic difficulty. Maybe two parameters? Lowest diff and highest diff?
    Implement feedback loop.
    Caching but maybe that should be done elsewhere.
*/