// Testing Groq with javascript. ignore this.
require('dotenv').config();

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  console.error('GROQ_API_KEY not found in environment variables');
  process.exit(1);
}

const url = 'https://api.groq.com/openai/v1/chat/completions';

const data = {
  model: "llama3-groq-70b-8192-tool-use-preview",
  messages: [
    {
      "role": "system",
      "content": "say hello\n\n"
    },
    {
      "role": "user",
      "content": ""
    }
  ],
  temperature: 0.5,
  max_tokens: 1024,
  top_p: 0.65,
  stream: true,
  stop: null
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify(data)
})
.then(response => {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  function readStream() {
    reader.read().then(({ done, value }) => {
      if (done) {
        console.log('\nStream complete');
        return;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop(); // Keep the last incomplete line in the buffer

      lines.forEach(line => {
        if (line.startsWith('data: ')) {
          const content = line.slice(6).trim();
          if (content === '[DONE]') {
            console.log('\nStream complete');
            return;
          }
          try {
            const jsonData = JSON.parse(content);
            if (jsonData.choices && jsonData.choices[0].delta.content) {
              process.stdout.write(jsonData.choices[0].delta.content);
            }
          } catch (error) {
            console.error('Error parsing JSON:', error);
            console.error('Problematic line:', line);
          }
        }
      });

      readStream();
    }).catch(error => {
      console.error('Error reading stream:', error);
    });
  }

  readStream();
})
.catch(error => console.error('Error:', error));