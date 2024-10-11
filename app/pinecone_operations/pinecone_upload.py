""" 
    Name: pinecone_upload.py
    Modules: upload_to_pinecone
    Description: Program accepts chunk objects, containing text and metadata.
    Creates an embedding using ada and stores in pinecone along with passed values
    user_id and workspace_id.
    parameters: {string} user_id - string representing unique user.
                {string} workspace_id - string representing user's unique workspace.
                {string} document_id - string representing user's unique document.
                {list} chunks - list of chunk objects including text and metadata.
"""
import os
import uuid
from pinecone import Pinecone, ServerlessSpec
from openai import OpenAI
import sys
import json

# For now insert key in "", delete line when issue resolves.
client = OpenAI(api_key= os.getenv('OPENAI_APIKEY'))

# Bring this code back in when issue resolves.
# client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# from dotenv import load_dotenv

# Load environment variables.
# load_dotenv()
pinecone_api_key = os.getenv('PINECONE_APIKEY')
pinecone_env = os.getenv('PINECONE_ENVIRONMENT') 
openai_api_key = os.getenv('OPENAI_APIKEY')

# Initialize Pinecone client and openAI for embedding.
pc = Pinecone(api_key=pinecone_api_key)

# Define Pinecone index name.
index_name = "ai-tutor-index" 

# Create Pinecone index if it doesn't exist (standard structure).
if index_name not in pc.list_indexes().names():
   pc.create_index(
       name=index_name,
       dimension=1536,
       metric='cosine', 
       spec=ServerlessSpec(
           cloud='aws',
           region='us-east-1'
       )
   )

def generate_embedding(text):
   """Generates an embedding vector from the provided text."""
   response = client.embeddings.create(
       model="text-embedding-ada-002", 
       input=[text]
   )
   return response.data[0].embedding

def upload_to_pinecone(chunks, user_id, workspace_id, document_id):
   """Uploads text chunks as vectors to Pinecone with metadata."""
   index = pc.Index(index_name)

   vectors = []
   for chunk in chunks:
       embedding = generate_embedding(chunk['text'])
       unique_id = uuid.uuid4()

       vector = {
           'id': f"{user_id}-{workspace_id}-{document_id}-{unique_id}", 
           'values': embedding,
           'metadata': {
               'user_id': user_id,
               'workspace_id': workspace_id,
               'document_id': document_id,
               'text': chunk['text'],
               'annotations': chunk['annotations'],
               'source_info': chunk['source_info'],
               'tags': chunk['tags']
           }
       }
       vectors.append(vector)

   batch_size = 100
   for i in range(0, len(vectors), batch_size):
       index.upsert(vectors=vectors[i:i + batch_size])

   print(f"Uploaded {len(vectors)} chunks to Pinecone.")

if __name__ == "__main__":
    if len(sys.argv) != 5:
        print("Usage: python pinecone_upload.py <user_id> <workspace_id> <document_id> '<json_chunks>'")
        sys.exit(1)

    user_id = sys.argv[1]
    workspace_id = sys.argv[2]
    document_id = sys.argv[3]
    json_chunks = sys.argv[4]

    try:
        chunks = json.loads(json_chunks)
        upload_to_pinecone(chunks, user_id, workspace_id, document_id)
    except json.JSONDecodeError:
        print("Error: Invalid JSON input for chunks")
        sys.exit(1)
    except Exception as e:
        print(f"Error uploading to Pinecone: {str(e)}")
        sys.exit(1)

# Code works
# Current concerns: fix client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
# Future plans:
# Implement error handling
# Logging and debugging
# proccess chunks in parallel
# Even if index is initialized implement validation of index properties.
# Let batch_size be more dynamic
# validate chunks before uploading.
# refactor to sepereate concerns -- vector creation should be own function.
# Have api keys be settable by user.
# Cache to prevent similar embeddings.
# Can we prevent storing if we find a similar embedding in database? How will unique metadata be retrieved?