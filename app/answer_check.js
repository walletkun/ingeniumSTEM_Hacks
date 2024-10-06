/*
    Name: answer_check.js
    Exports: testAnswerGenerator
    Description: Checks a user's answer against correct answer and returns 
    how correct the user's answer is 1 - 5 and why.
    Takes in the question, the correct answer, the user's answer, the user_id and workspace_id as strings.
    Queries pinecone for relevant data.
    Queries openAi for resut.
    Returns JSON with score and explanation.
*/
// React module and pinecone/openAI imports in ES module format.
import { queryPinecone } from './pinecone_operations/pinecone_retrieve.js';
import OpenAITutor from './openaiTutor.js';

// Constant string 'systemMessage' to make openAI grade correctly.
const systemMessage = `
You are a knowledgeable assistant tasked with evaluating a user's answer to a short answer question. Based on the user's response, the correct answer, and relevant content, provide a score on a scale of 1 to 5 indicating the correctness of the user's answer.

### Task Instructions:
1. **Correctness Scale**: Rate the user's answer on a scale from 1 to 5, where:
   - 1 = Completely incorrect
   - 2 = Mostly incorrect
   - 3 = Somewhat correct
   - 4 = Mostly correct
   - 5 = Completely correct

2. **Explanation**: 
    - Provide a brief explanation detailing why the user's answer is rated as it is. Address specific elements of the answer that are correct or incorrect, and explain why based on the relevant content.
    - Address the user directly.

### Output Format:
Return the evaluation in the following JSON format:

{
  "correctness": <number between 1 and 5>,
  "explanation": "<explanation text>"
}
`;

// Answer check logic.
const AnswerGenerator = async ({question, correct_answer, user_answer, user_id, workspace_id}) => {
    // Construct query based on props.
    const query = `
    Question: ${question}
    User Answer: ${user_answer}
    Correct Answer: ${correct_answer}
    Please evaluate the user's answer and provide a score from 1 to 5 along with an explanation of why the answer is correct or incorrect.`;
    
    // Query Pinecone to fetch related content for answer check.
    const pineconeResults = await queryPinecone(question, user_id, workspace_id);

    // Generate response using OpenAI.
    const tutor = new OpenAITutor();
    const testResponse = await tutor.generateResponse(systemMessage, pineconeResults, query);        

    // Return the generated response in the expected JSON format.
    return testResponse;    
}


// Test function to verify AnswerGenerator functionality. REMOVE LATER.
const testAnswerGenerator = async () => {
    // Sample input parameters
    const testParams = {
        question: "Explain how Julius Cesear was successful in Gaul",
        correct_answer: "Julius Cesear was successful militarily but was also able to generate massive wealth, reputation, and the loyalty of his men",
        user_answer: "He won against the Gauls and was able to subdue them", // Example user answer
        user_id: "test_user", // Example user ID
        workspace_id: "test_workspace" // Example workspace ID
    };

    // Call AnswerGenerator with sample parameters
    const evaluationResult = await AnswerGenerator(testParams);

    // Output the evaluation result to the console
    console.log("Evaluation Result:", JSON.stringify(evaluationResult, null, 2));
};

// Run the test function. REMOVE LATER.
testAnswerGenerator();

// Export AnswerGenerator for use in front end.
export { AnswerGenerator };

// Export the default testAnswerGenerator for testing purposes. REMOVE LATER.
export default testAnswerGenerator;

/*
    Code works.
    Future plans:
    Better error handling and logging.
    Play with prompt.
    Allow for caller to set point scale i.e instead of only 1 - 5,  have a max point prop.
    Implement feedback loop to personalize function.
    Refractor for better seperation of responsabilities.
    Store systemMessage somewhere else.
    Allow for a constant server connection.
    openaiTutor needs to allow for setable dimensions that we can implement here.
    Should we do NLP instead/ in addition to openai analysis?
*/