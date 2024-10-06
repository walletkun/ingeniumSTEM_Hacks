/*
    Name: session_notes.js
    Export: SessionNotesGenerator
    Description: Queries openai for session notes based on provided chat history.
*/

// Required modules imported in ES format.
import OpenAITutor from './openaiTutor.js';

// Constant string 'systemMessage' to make OpenAI summarize the session notes.
const systemMessage = `
You are an intelligent assistant tasked with summarizing the content of a session. Your goal is to capture the most important points, main topics discussed, and key takeaways, providing a comprehensive yet concise summary of the session.

### Task Instructions:
1. **Content Overview**:
   - Summarize the main topics covered during the session.
   - Highlight key questions asked and responses given.
   - Focus on capturing essential information, advice given, and any important concepts discussed.

2. **Format & Organization**:
   - Structure the session notes as a series of bullet points, with each bullet representing a key topic or insight.
   - Maintain clarity and coherence, so the user can easily understand the main points discussed.

3. **User-Focused Content**:
   - Emphasize any actionable advice, learning points, or conclusions that are beneficial to the user.
   - If relevant, suggest any follow-up steps or resources for further learning.

### Output Format:
Return the session notes in the following JSON format:

{
  "session_notes": [
    "Key point or topic discussed",
    "Another key point or insight",
    ...
  ]
}
`;

// Session notes generation logic.
const SessionNotesGenerator = async (chatHistory) => {
    // Construct query based on chat history.
    const query = `Please summarize the following session in the format specified in the task instructions:\n\nChat History:\n${chatHistory.map(message => `[${message.role}]: ${message.content}`).join('\n')}`;

    // Get session notes using OpenAI.
    const tutor = new OpenAITutor();
    const sessionNotesResponse = await tutor.generateResponse(systemMessage, "", query);

    // Return the generated session notes.
    return sessionNotesResponse;
}

// Test function to verify SessionNotesGenerator functionality. REMOVE LATER.
const testSessionNotesGenerator = async () => {
    // Sample chat history
    const chatHistory = [
        { role: "user", content: "Can you explain what a binary search algorithm is?" },
        { role: "assistant", content: "Sure! A binary search algorithm is used to find the position of a target value within a sorted array..." },
        { role: "user", content: "How is it different from linear search?" },
        { role: "assistant", content: "Binary search is much more efficient, with a time complexity of O(log n), whereas linear search is O(n)..." }
    ];

    // Call SessionNotesGenerator with sample chat history
    const sessionNotes = await SessionNotesGenerator(chatHistory);

    // Output the generated session notes to the console
    console.log("Generated Session Notes:", JSON.stringify(sessionNotes, null, 2));
};

// Run the test function. REMOVE LATER.
testSessionNotesGenerator();

// Export SessionNotesGenerator for use in the front end.
export { SessionNotesGenerator };

// Export the default testSessionNotesGenerator for testing purposes. REMOVE LATER.
export default testSessionNotesGenerator;

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