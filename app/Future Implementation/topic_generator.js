/*
    Name: topic_generator.js
    Export: TopicGenerator
    Description: Provides an idea for a topic for specified study material type.
    Passed material type (i.e. flashcards, study guide, practice test),
    workspace name (i.e. calculus, roman history),
    and ids for user and workspace.
    Queries pinecone for relevant data.
    Gets string representing topic from openai and returns it.
*/
// React module and pinecone/openAI imports in ES module format.
import { queryPinecone } from './pinecone_operations/pinecone_retrieve.js';
import OpenAITutor from './openaiTutor.js';

// System prompt for openai.
const systemMessage = 
`You are a knowledgable assistant tasked with providing a topic idea for the specified study material
    based on the relevant topic. 
    example: Give me a topic idea for a flashcard set based on calculus
    answer: Derivative formulas`;
// Topic generator logic.
const TopicGenerator = async ({material_type, workspace_name, user_id, workspace_id}) => {

    // Construct query based on props.
    const query = `Give me a topic idea for a ${material_type} based on ${workspace_name}`;

    // Query pinecone for relevant content.
    const pineconeResults = await queryPinecone(workspace_name, user_id, workspace_id);

    // Generate response using OpenAI.
    const tutor = new OpenAITutor();
    const topicResponse = await tutor.generateResponse(systemMessage, pineconeResults, query);

    // Return string.
    return topicResponse
}

// Test function to verify topicGenerator functionality. REMOVE LATER.
const testTopicGenerator = async () => {
    // Sample input parameters
    const testParams = {
        material_type: "flash cards",
        workspace_name: "Roman history",
        user_id: "test_user", // Example user ID
        workspace_id: "test_workspace" // Example workspace ID
    };

    // Call AnswerGenerator with sample parameters
    const topic = await TopicGenerator(testParams);

    // Output the evaluation result to the console
    console.log("Evaluation Result:", topic);
};

// Run the test function. REMOVE LATER.
testTopicGenerator ();

// Export AnswerGenerator for use in front end.
export {TopicGenerator};

// Export the default testAnswerGenerator for testing purposes. REMOVE LATER.
export default testTopicGenerator;

/*
    Code works.
    Future plans:
    Better error handling and logging.
    Play with prompt.
    Constant connection with apis.
    Allow for parameter passing to api implementations.
    Caching
    Translations.
*/