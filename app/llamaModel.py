import json
import sys
from dotenv import load_dotenv
import os
from groq import Groq

# Load environment variables
load_dotenv()
api_key = os.getenv('GROQ_API_KEY')

# Initialize Groq client with API key
client = Groq(api_key=api_key)

# Chunk class definition
class Chunk:
    def __init__(self, text, annotations="", source_info="", tags=""):
        self.text = text
        self.annotations = annotations
        self.source_info = source_info
        self.tags = tags

def analyze_text_with_llama(parsed_text):
    """Analyzes the text using LLaMA and returns structured insights for embedding."""
    try:
        llama_prompt = (
            "Analyze the following text and provide a structured breakdown optimized for embedding into a vector database.\n\n"
            "Please return the result in JSON format, where each chunk of text is organized as an object with the following fields:\n"
            "1. 'text': The original, unaltered text of the chunk.\n"
            "2. 'annotations': A thorough, conversational analysis of the content, explaining key concepts, relationships, and context.\n"
            "3. 'source_info': Information about the source, such as textbook name, author, chapter, page number, if applicable.\n"
            "4. 'tags': A list of relevant tags or keywords for the chunk.\n\n"
            "Make sure to keep the original text intact and chunk the content based on meaningful breaks (such as different ideas, concepts, or sections).\n\n"
            "Example JSON Output:\n"
            "{\n"
            "  \"chunks\": [\n"
            "    {\n"
            "      \"text\": \"Superposition is the principle that a quantum system can be in multiple states at once until measured.\",\n"
            "      \"annotations\": \"This section discusses the fundamental concept of superposition in quantum mechanics. Superposition allows quantum systems to exist in multiple states simultaneously until observed. The section relates to broader discussions of quantum theory, and understanding this concept is essential for grasping advanced ideas such as entanglement.\",\n"
            "      \"source_info\": \"Quantum Physics 101, Chapter 3, Page 45\",\n"
            "      \"tags\": [\"superposition\", \"quantum mechanics\", \"quantum states\"]\n"
            "    },\n"
            "    {\n"
            "      \"text\": \"Quantum entanglement is a phenomenon where the state of one particle depends on the state of another, regardless of distance.\",\n"
            "      \"annotations\": \"This part elaborates on quantum entanglement, which builds upon the principle of superposition. The relationship between entangled particles is such that the state of one directly affects the state of the other, even when separated by great distances.\",\n"
            "      \"source_info\": \"Quantum Physics 101, Chapter 3, Page 48\",\n"
            "      \"tags\": [\"quantum entanglement\", \"superposition\", \"particle physics\"]\n"
            "    }\n"
            "  ]\n"
            "}\n\n"
            "Text to Analyze:\n"
            f"{parsed_text}"
        )
        
        
        # Make request to Groq for analysis
        completion = client.chat.completions.create(
            model="llama3-groq-70b-8192-tool-use-preview",
            messages=[
                {
                    "role": "system",
                    "content": llama_prompt
                }
            ],
            temperature=0.5,
            max_tokens=1024,
            top_p=0.65,
            stream=True,
            stop=None,
        )

        # Extract insights from the response
        insights = ""
        for chunk in completion:
            insights += chunk.choices[0].delta.content or ""
        
        return insights
    except Exception as e:
        print(f"Error analyzing text with LLaMA: {e}", file=sys.stderr)
        return None

def process_json_and_create_chunks(json_data):
    """Processes the JSON response and creates Chunk instances."""
    try:
        # Parse the JSON response
        data = json.loads(json_data)
        
        # Extract chunks from the JSON
        chunks = data.get('chunks', [])
        chunk_objects = []
        
        # Loop through the chunks and create Chunk instances
        for chunk_data in chunks:
            chunk = Chunk(
                text=chunk_data.get('text', ''),
                annotations=chunk_data.get('annotations', ''),
                source_info=chunk_data.get('source_info', ''),
                tags=', '.join(chunk_data.get('tags', []))  # Joining tags as a string
            )
            chunk_objects.append(chunk)
            
        return chunk_objects
    except Exception as e:
        print(f"Error processing JSON and creating chunks: {e}", file=sys.stderr)
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Please provide the path to the input file", file=sys.stderr)
        sys.exit(1)

    input_file_path = sys.argv[1]
    
    # Read input from file
    with open(input_file_path, 'r') as file:
        parsed_text = file.read()
    
    # Analyze the text with LLaMA
    analysis = analyze_text_with_llama(parsed_text)
    
    # Process the JSON response and create Chunk objects
    if analysis:
        chunks = process_json_and_create_chunks(analysis)
        if chunks:
            # Convert chunks to JSON for output
            output = json.dumps([vars(chunk) for chunk in chunks])
            print(output)
        else:
            print("No chunks created", file=sys.stderr)
    else:
        print("Analysis failed", file=sys.stderr)