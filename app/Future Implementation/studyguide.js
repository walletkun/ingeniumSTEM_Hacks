/*
    Name: studyguide.js
    Export: StudyGuideGenerator
    Description: Provides study guide based on specified topic recieved from openai.
*/
// React module and pinecone/openAI imports in ES module format.
import { queryPinecone } from './pinecone_operations/pinecone_retrieve.js';
import OpenAITutor from './openaiTutor.js';

// Constant string 'systemMessage' to make openAI provide presentable study guide.
// Constant string 'systemMessage' to make openAI provide presentable study guide.
const systemMessage = `
You are a knowledgeable and engaging tutor tasked with creating a detailed, easy-to-understand study guide based on a specified subject. Your goal is to help the user grasp key concepts, important terms, and overarching themes.

### Task Instructions:
1. **Content Overview**:
   - Provide a comprehensive overview of the subject, breaking down complex ideas into simpler explanations.
   - Highlight key topics, themes, and concepts that are essential to understanding the subject as a whole.

2. **Organization**:
   - Structure the study guide into clear sections and subsections, each with a relevant heading.
   - Include bullet points, numbered lists, and summaries where necessary to make the content digestible.

3. **Examples and Analogies**:
   - Use examples, analogies, or real-world applications to explain difficult concepts and make them relatable to the user.

4. **Visual Aids and Tips**:
   - Suggest potential visual aids (like diagrams, charts, or tables) to enhance understanding.
   - Include study tips or memory aids for challenging topics to aid retention.
5. **Source Material Reliance**
    - When possible rely on provide content that has been parsed from the appropriate subject material.
    - When possible and helpful provide refrence to source material information: i.e. source name, page number, ect.

### Output Format:
Return the study guide as a well-organized, formatted string, like so:

**[Section Title]**
- [Point 1]: [Brief explanation]
- [Point 2]: [Brief explanation]

**[Section Title]**
1. [Explanation with examples]
2. [Further breakdown with analogies]

If any part of the user's request is unclear, try your best to infer what is most likely needed to help them learn effectively.
`;

// Study guide generator logic.
const StudyGuideGenerator = async ({ topic, user_id, workspace_id }) => {

    // Form query from passed props.
    const query = `Please provide a study guide on ${topic}`;

    // Query Pinecone for relevant data.
    const pineconeResults = await queryPinecone(topic, user_id, workspace_id);

    // Get study guide from OpenAI.
    const tutor = new OpenAITutor();
    const studyGuideResponse = await tutor.generateResponse(systemMessage, pineconeResults, query);

    // Return the generated study guide in the expected format.
    return studyGuideResponse;
}

// Test function to verify StudyGuideGenerator functionality. REMOVE LATER.
const testStudyGuideGenerator = async () => {
    // Sample input parameters
    const testParams = {
        topic: "Machine Learning", // The subject for the study guide
        user_id: "test_user_123", // Example user ID
        workspace_id: "test_workspace_456" // Example workspace ID
    };

    // Call StudyGuideGenerator with sample parameters
    const generatedGuide = await StudyGuideGenerator(testParams);

    // Output the generated study guide to the console
    console.log("Generated Study Guide:", generatedGuide);
};

// Run the test function. REMOVE LATER.
testStudyGuideGenerator();

// Export StudyGuideGenerator for use in the front end.
export { StudyGuideGenerator };

// Export the default testStudyGuideGenerator for testing purposes. REMOVE LATER.
export default testStudyGuideGenerator;

/*
    Code works.
    Future Plans:
    Need to figure out best formating.
    Also this needs to work with a program to format this nicely.
    Constant connection to api, pass dimensions to api.
    Play with prompt.
    Store prompt elsewhere.
    Filteration of topic, topic validation.
    Error handling, logging.
    Translation.
*/