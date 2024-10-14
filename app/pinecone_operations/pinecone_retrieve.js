/*
  Name: pinecone_retrieve.js
  Modules: queryPinecone 
  Description: Program accepts a query (list of strings) from caller program.
  Searches pinecone database for most similar vectors and returns result as array of objects.
*/ 
// Required modules
import OpenAI from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';



// Initialize OpenAI configuration
const openaiClient = new OpenAI({
  // For now put in apikey directly.
  apiKey: ""



,
  dangerouslyAllowBrowser: true,
});

// Initialize Pinecone
const pinecone = new Pinecone({
  // For now hardcode apiKey.
  apiKey: ""




,

});

// Set index name for pinecone.
const indexName = "ai-tutor-index";

/**
 * @param {string} query - The search query string.
 * @returns {Array<number>} - An array of numbers representing the embedding vector. 
 *  query can be list of strings or just string.
 * Passes query to ada to generate embedding for use in queryPinecone.
 * Structure is typical along with some error handling.
*/
// I write this same function but in python in upload program. Maybe we should implement as seperate program.
async function generateEmbedding(query) {
  try {
    const response = await openaiClient.embeddings.create({
      model: "text-embedding-ada-002",
      input: [query]
    });
    return response.data[0].embedding;

    // Should implement better error handling and logging here.
  } catch (error) {
    console.error("Error generating embedding:", error);
    return null;
  }
}


/** 
 * Queries Pinecone for vectors matching the given query embedding.
 * @param {string} query - The search query string.
 * @param {string} userId - The user ID for filtering results.
 * @param {string} workspaceId - The workspace ID for filtering results.
 * @param {number} topK - Number of top results to return (default is 10).
 * @returns {response.matches} - An array of matching vectors from Pinecone.
 */
// I may want to implement an optional sourceId in the future.
async function queryPinecone(query, userId, workspaceId, topK = 10) {
  // Generate query embedding
  const queryEmbedding = await generateEmbedding(query);

  // Should implement better error handling and logging here.
  if (!queryEmbedding) {
    console.error("Embedding generation failed.");
    return ' ';
  }

  // Query Pinecone index with filters. Requests metadata.
  try {
    const index = pinecone.Index(indexName);
    const response = await index.query({
      vector: queryEmbedding,
      topK: topK,
      includeMetadata: true,
      filter: {
        user_id: userId,
        workspace_id: workspaceId,
      }
    });

    // Return results in string format.
    const formattedResults = response.matches.map(entry => 
      `Text: ${entry.metadata.text}\nSource Info: ${entry.metadata.source_info}\nAnnotations: ${entry.metadata.annotations}\nTags: ${entry.metadata.tags}`
    ).join('\n\n'); 
    return formattedResults;

  } catch (error) {
    console.error("Error querying Pinecone:", error);
    return ' ';
  }
}

// Export the function for external usage.
export { queryPinecone, generateEmbedding};

// Test function to verify Pinecone query functionality
// DELETE LATER.
/*async function testPineconeRetrieve() {
  const user_id = 'test_user';
  const workspace_id = 'test_workspace';
  const query = 'Julius Cesear';

  try {
    const pineconeResponse = await queryPinecone(query, user_id, workspace_id);
    console.log('Raw Pinecone Response:', pineconeResponse);

    pineconeResponse.forEach((entry, index) => {
      console.log(`Result ${index + 1}:`);
      console.log('Text:', entry.metadata.text);
      console.log('Source Info:', entry.metadata.source_info);
      console.log('Annotations:', entry.metadata.annotations);
      console.log('Tags:', entry.metadata.tags);
    });

    const combinedString = pineconeResponse.map(entry =>
      `${entry.metadata.text}\nSource Info: ${entry.metadata.source_info}\nAnnotations: ${entry.metadata.annotations}\nTags: ${entry.metadata.tags}`
    ).join('\n\n');

    console.log('Combined String:', combinedString);
  } catch (error) {
    console.error('An error occurred while retrieving data from Pinecone:', error);
  }
}

// Run the test
testPineconeRetrieve();
*/

/*
  Code works
  Future plans:
  Better error handling and logging.
  Let users use their own keys.
  Refractor code for modality. 
    Embedding should be done in seprate program and shared with upload.
    Pinecone initilization should be done in seperate program and shared with upload.
    Initilize pinecone once at start of app and reuse same connection to improve performance.
  Keep a cache of embeddings in memory for similar queries -> 
    can match query string in memory to forgo embedding and query
    can match embeddings in memory to forgo pinecone query
  Handle queries in batches for when multiple users are using same pinecone connection.
  Handle cases when pinecone returns no result or results that are too different from query.
*/