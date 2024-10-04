/*
    Chatbox program.
*/

// React modules for state handling, and our pinecone and openai modules.
import { useState } from 'react';
import { queryPinecone } from './pinecone_operations/pinecone_retrieve';
import OpenAITutor from './openaiTutor';

// Constant string 'systemMessage' is for openAI use.
const systemMessage = 
`Your role is to act as a friendly and highly effective AI tutor, with two primary functions: delivering outstanding communication and providing exceptional teaching on the selected subject. Follow these guidelines:
Subject-Specific Expertise: focus exclusively on the subject that the content given to you specifies. All responses, examples, and interactions should remain aligned with this topic, ensuring no deviation from the user's chosen focus.
Exceptional Teaching Skills: Your priority is to ensure the user fully understands the material being discussed. Use clear and engaging explanations and:
Ask follow-up questions to test the user's understanding of the topic in real-time.
If the user consistently answers incorrectly, strongly encourage them to practice more with you until they show signs of comprehension before moving forward.
If the user insists on proceeding despite lack of understanding, suggest they return to previous material, but proceed with the new lesson if they remain persistent.
Simplified Explanations: If the user repeatedly expresses difficulty understanding a concept:
Offer a simpler explanation.
If needed, provide a "5-year-old" level explanation to ensure the user grasps the basics.`;

// Combines chat history into a single string for context in OpenAI
const formatChatHistory = (chatHistory) => {
    return chatHistory.map(entry => `${entry.role}: ${entry.content}`).join('\n');
};


// Creates and initializes chatbox function to handle message logic. 
const Chatbox = ({ userName, user_id, workspace_id }) => {
    const [chatHistory, setChatHistory] = useState([
        {
            role: 'Cicero',
            content: `Hello! How can I assist you today, ${userName}?`
        }
    ]);

    // -------- TESTING LINE -------
    console.log ("Initial chat state: ", formatChatHistory (chatHistory));

    // State to hold the current input text that the user is typing.
    const [message, setMessage] = useState('');

    // Updates message state with current input in real-time.
    const handleInputChange = (inputEvent) => {
        const input = inputEvent.target.value;
        setMessage(input);
    };

    // When the front end sends the message, return answer, and save both to chatHistory.
    const sendMessage = async () => {

        // Transfers user message to variable then clears input field.
        const currentMessage = message;
        setMessage('');

        // Updates 'chatHistory' with the user's message.
        setChatHistory((chatHistory) => [
            ...chatHistory,
            { role: 'user', content: currentMessage }
        ]);

        // -------- TESTING LINE -------
        console.log ("State after update: ", formatChatHistory (chatHistory));

        // Queries Pinecone for top results as a string.
        const userId = user_id;
        const workspaceId = workspace_id;
        const pineconeResults = await queryPinecone(currentMessage, userId, workspaceId);

        // -------- TESTING LINE -------
        console.log ("Pinecone results: ", pineconeResults);

        // Format chat history to maintain context.
        const formattedChatHistory = formatChatHistory(chatHistory);

        // Generate response from our openAI model.
        const tutor = new OpenAITutor();
        const aiResponse = await tutor.generateResponse(systemMessage, pineconeResults, formattedChatHistory);

        // -------- TESTING LINE -------
        console.log ("AI response: ", aiResponse);

        // Add the AI's response to chatHistory.
        setChatHistory((chatHistory) => [
            ...chatHistory,
            { role: 'Cicero', content: aiResponse || "I'm sorry, I'm having trouble processing your request right now. Please try again." }
        ]);

        // -------- TESTING LINE -------
        console.log ("Final state: ", formatChatHistory (chatHistory));
    };

    // Returns `null` so no front-end UI is rendered directly by this component.
    return null;
};

// If we want to handle rendering separately, front end calls on this component.
export { Chatbox };

// Temporary test component for direct testing
const ChatboxTester = () => {
    // Mock data for testing
    const userName = "TestUser";
    const user_id = "user123";
    const workspace_id = "workspace456";

    return (
        <div>
            <h1>Chatbox Tester</h1>
            {}
            <Chatbox userName={userName} user_id={user_id} workspace_id={workspace_id} />
        </div>
    );
};

// Render the ChatboxTester for testing
export default ChatboxTester;