from dotenv import load_dotenv
import os
from groq import Groq

# Load environment variables
load_dotenv()
api_key = os.getenv('GROQ_API_KEY')

# Initialize Groq client with API key
client = Groq(api_key=api_key)

# File path for parsed text
parsed_text_path = "parsed_text.txt"
def load_text_from_file(file_path):
    """Loads text from a file."""
    try:
        with open(file_path, 'r') as file:
            return file.read()
    except Exception as e:
        print(f"Error loading text from file: {e}")
        return None

def analyze_text_with_llama(parsed_text):
    """Analyzes the text using LLaMA and returns insights."""
    try:
        # Make request to Groq for analysis
        completion = client.chat.completions.create(
            model="llama3-groq-70b-8192-tool-use-preview",
            messages=[
                {
                    "role": "system",
                    "content": "Analyze the following text for insights, summaries, key points, keywords, and any notable concepts."
                },
                {
                    "role": "user",
                    "content": parsed_text
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
        print(f"Error analyzing text with LLaMA: {e}")
        return None

def save_analysis_to_file(analysis, output_path="analysis.txt"):
    """Saves the analysis to a text file."""
    try:
        with open(output_path, 'w') as file:
            file.write(analysis)
        print(f"Insights written to {output_path}")
    except Exception as e:
        print(f"Error saving analysis to file: {e}")

if __name__ == "__main__":
    # Step 1: Load the parsed text from file
    parsed_text = load_text_from_file(parsed_text_path)
    
    # Step 2: Analyze the text with LLaMA
    if parsed_text:
        analysis = analyze_text_with_llama(parsed_text)
        
        # Step 3: Save the analysis to a file
        if analysis:
            save_analysis_to_file(analysis)