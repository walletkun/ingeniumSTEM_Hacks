""" 
    Name: pinecone_upload.py
    Modules: upload_to_pinecone
    Description: Program accepts chunk object, an object containing text and metadata.
    Creates an embedding using ada and stores in pinecone along with passed values
    user_id and workspace_id.
    parameters: {string} user_id - string representing unique user.
                {string} workspace_id - string representing user's unique workspace.
                {string} document_id - string representing user's unique document.
                {object} chunk - object including text and metadata.
"""
# Needed modules.
import os
import uuid  # Import uuid for generating unique IDs
from pinecone import Pinecone, ServerlessSpec
from openai import OpenAI


# For now insert key in "", delete line when issue resolves.
client = OpenAI(api_key= "")


# Bring this code back in when issue resolves.
# client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))


from dotenv import load_dotenv


# Load environment variables.
load_dotenv()
pinecone_api_key = os.getenv('PINECONE_API_KEY')
pinecone_env = os.getenv('PINECONE_ENVIRONMENT') 
openai_api_key = os.getenv('OPENAI_API_KEY')


# Initialize Pinecone client and openAI for embedding.
pc = Pinecone(api_key="")


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
def upload_to_pinecone(text_chunks, user_id, workspace_id, document_id):
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
           'id': f"{user_id}-{workspace_id}-{document_id}-{unique_id}", 
           'values': embedding,
           'metadata': {
               'user_id': user_id,
               'workspace_id': workspace_id,
               'document_id': document_id,
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


######### Code to test above program. DELETE LATER ########
# Import the Chunk class from chunk.py
from chunk import Chunk

if __name__ == "__main__":
    # Example data: create 20 Chunk objects on Roman history
    text_chunks = [
        Chunk(
            text="Julius Caesar was assassinated on the Ides of March in 44 BCE by a group of Roman senators.",
            annotations="[Topic: Roman History] [Concept: Julius Caesar]",
            source_info="Textbook: History of Rome 101; Chapter: 5; Page: 120",
            tags="Rome, Caesar, assassination"
        ),
        Chunk(
            text="The Roman Republic was established in 509 BCE, following the overthrow of the Roman monarchy.",
            annotations="[Topic: Roman History] [Concept: Roman Republic]",
            source_info="Textbook: History of Rome 101; Chapter: 1; Page: 15",
            tags="Rome, Republic, monarchy"
        ),
        Chunk(
            text="The Punic Wars were a series of conflicts between Rome and Carthage from 264 BCE to 146 BCE.",
            annotations="[Topic: Roman History] [Concept: Punic Wars]",
            source_info="Textbook: Rome and Carthage: A Comparative Study; Chapter: 3; Page: 45",
            tags="Rome, Carthage, wars"
        ),
        Chunk(
            text="Hannibal Barca was a Carthaginian general who famously led his troops, including war elephants, across the Alps into Italy.",
            annotations="[Topic: Roman History] [Concept: Hannibal Barca]",
            source_info="Textbook: Military Leaders of Antiquity; Chapter: 2; Page: 78",
            tags="Hannibal, Carthage, Alps"
        ),
        Chunk(
            text="The Roman Empire reached its territorial peak under Emperor Trajan in 117 CE.",
            annotations="[Topic: Roman History] [Concept: Roman Empire]",
            source_info="Textbook: The Empire Strikes: Rome; Chapter: 4; Page: 102",
            tags="Rome, Empire, Trajan"
        ),
        Chunk(
            text="The Pax Romana was a period of relative peace and stability across the Roman Empire that lasted for over 200 years.",
            annotations="[Topic: Roman History] [Concept: Pax Romana]",
            source_info="Textbook: Peace in Ancient Times; Chapter: 6; Page: 140",
            tags="Rome, peace, stability"
        ),
        Chunk(
            text="Augustus, originally named Octavian, was the founder of the Roman Empire and its first Emperor.",
            annotations="[Topic: Roman History] [Concept: Augustus]",
            source_info="Textbook: Founders of Empires; Chapter: 8; Page: 200",
            tags="Rome, Augustus, Empire"
        ),
        Chunk(
            text="The Roman Senate was a political institution in ancient Rome, one of the most enduring entities throughout its history.",
            annotations="[Topic: Roman History] [Concept: Roman Senate]",
            source_info="Textbook: Political Institutions of Rome; Chapter: 3; Page: 55",
            tags="Rome, Senate, politics"
        ),
        Chunk(
            text="The Colosseum, an iconic symbol of Imperial Rome, was an amphitheater used for gladiatorial games and public spectacles.",
            annotations="[Topic: Roman History] [Concept: Colosseum]",
            source_info="Textbook: Architecture of Ancient Rome; Chapter: 10; Page: 222",
            tags="Rome, Colosseum, architecture"
        ),
        Chunk(
            text="The Roman legions were the backbone of the Roman military, highly disciplined and professional soldiers.",
            annotations="[Topic: Roman History] [Concept: Roman Legions]",
            source_info="Textbook: Military Might of Rome; Chapter: 7; Page: 175",
            tags="Rome, legions, military"
        ),
        Chunk(
            text="Constantine the Great was the first Roman emperor to convert to Christianity and played a crucial role in its spread throughout the empire.",
            annotations="[Topic: Roman History] [Concept: Constantine]",
            source_info="Textbook: Religious Transitions in Ancient Rome; Chapter: 12; Page: 310",
            tags="Rome, Constantine, Christianity"
        ),
        Chunk(
            text="The fall of the Western Roman Empire is traditionally dated to 476 CE, when the Germanic king Odoacer deposed the last Roman emperor, Romulus Augustulus.",
            annotations="[Topic: Roman History] [Concept: Fall of Western Rome]",
            source_info="Textbook: The Decline of Great Empires; Chapter: 15; Page: 400",
            tags="Rome, fall, empire"
        ),
        Chunk(
            text="The Twelve Tables were the ancient legislation that stood at the foundation of Roman law, created in the mid-5th century BCE.",
            annotations="[Topic: Roman History] [Concept: Twelve Tables]",
            source_info="Textbook: Legal Systems of the Ancient World; Chapter: 2; Page: 33",
            tags="Rome, law, legislation"
        ),
        Chunk(
            text="The Roman Forum was the center of public life in Rome, hosting markets, triumphal processions, and political gatherings.",
            annotations="[Topic: Roman History] [Concept: Roman Forum]",
            source_info="Textbook: Urban Centers of the Ancient World; Chapter: 9; Page: 210",
            tags="Rome, forum, public life"
        ),
        Chunk(
            text="Cicero was a Roman statesman, orator, and writer who influenced the Latin language and Roman philosophy.",
            annotations="[Topic: Roman History] [Concept: Cicero]",
            source_info="Textbook: Voices of Ancient Rome; Chapter: 5; Page: 120",
            tags="Rome, Cicero, orator"
        ),
        Chunk(
            text="The Battle of Actium in 31 BCE was a decisive confrontation that led to the downfall of Mark Antony and Cleopatra, and the rise of Octavian.",
            annotations="[Topic: Roman History] [Concept: Battle of Actium]",
            source_info="Textbook: Battles That Shaped Rome; Chapter: 7; Page: 180",
            tags="Rome, Actium, battle"
        ),
        Chunk(
            text="The Via Appia, or Appian Way, was one of the earliest and strategically most important Roman roads of the ancient republic.",
            annotations="[Topic: Roman History] [Concept: Via Appia]",
            source_info="Textbook: Infrastructure in the Roman Republic; Chapter: 11; Page: 270",
            tags="Rome, roads, infrastructure"
        ),
        Chunk(
            text="Marcus Aurelius, known as the philosopher king, was a Stoic emperor who authored 'Meditations,' a series of personal writings.",
            annotations="[Topic: Roman History] [Concept: Marcus Aurelius]",
            source_info="Textbook: Philosophers in Power; Chapter: 14; Page: 355",
            tags="Rome, Marcus Aurelius, Stoicism"
        ),
        Chunk(
            text="Roman gladiators were armed combatants who entertained audiences in the Roman Republic and Roman Empire in violent confrontations.",
            annotations="[Topic: Roman History] [Concept: Gladiators]",
            source_info="Textbook: Entertainment in Ancient Rome; Chapter: 10; Page: 230",
            tags="Rome, gladiators, entertainment"
        ),
        Chunk(
            text="The Roman aqueducts were architectural marvels that supplied water to cities and were a testament to Roman engineering skills.",
            annotations="[Topic: Roman History] [Concept: Aqueducts]",
            source_info="Textbook: Engineering Feats of Rome; Chapter: 13; Page: 325",
            tags="Rome, aqueducts, engineering"
        )
    ]

    user_id = "Pfn1XhsTDpMGZN80wSfc4NUEYwJ3"
    workspace_id = "HWApytaPJtazT8gq0zDb"
    document_id = "test_document"

    # Upload text chunks to Pinecone
    upload_to_pinecone(text_chunks, user_id, workspace_id, document_id)

    print("Chunks have been uploaded to Pinecone.")