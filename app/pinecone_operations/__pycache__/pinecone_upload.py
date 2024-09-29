# Needed modules.
import os
import uuid  # Import uuid for generating unique IDs
from pinecone import Pinecone, ServerlessSpec
from openai import OpenAI


# For now insert key in "", delete line when issue resolves.
client = OpenAI(api_key="")


# Bring this code back in when issue resolves.
# client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))


from dotenv import load_dotenv


# Load environment variables.
load_dotenv()
pinecone_api_key = os.getenv('PINECONE_API_KEY')
pinecone_env = os.getenv('PINECONE_ENVIRONMENT') 
openai_api_key = os.getenv('OPENAI_API_KEY')


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




# Function to generate embeddings using OpenAI's ada-002.
def generate_embedding(text):
   """Generates an embedding vector from the provided text."""
   response = client.embeddings.create(
       model="text-embedding-ada-002", 
       input=[text]  # Ensure input is a list
   )
   return response.data[0].embedding


# Function to upload text chunks to Pinecone with metadata
def upload_to_pinecone(text_chunks, user_id, workspace_id):
   """Uploads text chunks as vectors to Pinecone with metadata."""
   # Connect to Pinecone index
   index = pc.Index(index_name)


   # Loop over text chunks to generate embeddings and create vectors.
   vectors = []
   for i, chunk in enumerate(text_chunks):
       # Generate embedding
       embedding = generate_embedding(chunk.text)


       # Create a completely unique ID for use in vector's ID.
       unique_id = uuid.uuid4()


       # Construct the vector data with metadata from chunk and passed values.
       vector = {
           'id': f"{user_id}-{workspace_id}-{unique_id}", 
           'values': embedding,
           'metadata': {
               'user_id': user_id,
               'workspace_id': workspace_id,
               'text': chunk.text,
               'annotations': chunk.annotations,
               'source_info': chunk.source_info,
               'tags': chunk.tags
           }
       }


       # Place vector in vectors.
       vectors.append(vector)


   # Upsert vectors to Pinecone in batches.
   batch_size = 100
   for i in range(0, len(vectors), batch_size):
       index.upsert(vectors=vectors[i:i + batch_size])

