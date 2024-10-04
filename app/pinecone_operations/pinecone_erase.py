"""
    Name: pinecone_delete.py
    Description: This program accepts three strings representing 
    user_id, workspace_id, and document_id
    and deletes all vectors associated with that combination of values
    from the pinecone database.
    Caller function can iterate through documents to delete whole workspace.
    And can iterate through workspaces to delete whole user.
    Vector id MUST be created as this program expects --> user_id-workspace_id-document_id
"""
# Needed modules.
import os
from pinecone import Pinecone, ServerlessSpec
from dotenv import load_dotenv

# Load environment variables from .env file.
load_dotenv()
pinecone_api_key = os.getenv('PINECONE_API_KEY')

# Initialize Pinecone client.
pc = Pinecone(api_key=pinecone_api_key)

# Define the index name.
index_name = "ai-tutor-index"
index = pc.Index(index_name)


def delete_vectors_by_document(user_id, workspace_id, document_id):
    """
    Deletes all vectors associated with a specific document within a workspace of a user.

    This function iterates through vector IDs generated using the provided user ID, workspace ID,
    and document ID. For each generated vector ID, it checks if the vector exists in the Pinecone index.
    If a vector is found, it deletes that vector. The process continues until no more vectors are found
    matching the generated IDs.

    Args:
        user_id (str): The user ID for filtering vectors.
        workspace_id (str): The workspace ID within which the document vectors are located.
        document_id (str): The specific document ID whose vectors are to be deleted.

    Returns:
        None. Outputs to the console the ID of each deleted vector and the total count of vectors deleted.
    """
    # Start iteration index.
    i = 0  

    ###### This line is just for testing. DELETE LATER.  ########
    deleted_vectors = 0  

    while True:
        # Generate vector ID
        vector_id = f"{user_id}-{workspace_id}-{document_id}-{i}"
        
        try:
            # Fetch the vector metadata to check if it exists
            vector = index.fetch(ids=[vector_id])
            
            # Check if vector exists; break loop if not found.
            if not vector or 'vectors' not in vector or len(vector['vectors']) == 0:
                break
            
            # Delete the vector if it exists.
            index.delete(ids=[vector_id])

            ##### These two lines are for testing. DELETE LATER #########
            print(f"Deleted vector ID: {vector_id}")
            deleted_vectors += 1

        # Implement better error handling and logging.
        except Exception as e:
            # Log any errors that occur during fetching or deletion.
            print(f"Error fetching/deleting vector with ID {vector_id}: {e}")
            break  # Stop the loop if an error occurs.

        # Increment the iteration index
        i += 1

    #### This line is for testing. DELETE LATER ######
    print(f"Deletion completed. Total vectors deleted: {deleted_vectors}")

#### Test the deletion function. DELETE LATER ######
if __name__ == "__main__":
    user_id = 'test_Newuser'
    workspace_id = 'test_Newworkspace'
    document_id = 'test_Newdocument'
    
    # Run the deletion function
    delete_vectors_by_document(user_id, workspace_id, document_id)

# Code works.
# Future plans:
# Remove testing code.
# Add better error handling and logging.
# Delete in batches rather than one by one to limit calls and improve performance.
# Allow user to set own pinecone key?
# Initilize persistant pinecone connection outside this program.