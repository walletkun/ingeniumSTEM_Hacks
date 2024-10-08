import uploadFile from './uploadFile.js';

async function testUpload() {
    const testFilename = 'source_file.pdf';  // Changed to match your actual file name
    const testUserId = 'test_user_123';
    const testWorkspaceId = 'test_workspace_456';
    
    try {
        const result = await uploadFile(testFilename, testUserId, testWorkspaceId);
        console.log('Upload completed successfully.');
        console.log('Parsed PDF text (first 100 characters):', result.parsedText.substring(0, 100));
        console.log('LlamaModel output:', result.llamaOutput);
        console.log('Pinecone upload result:', result.pineconeOutput);
    } catch (error) {
        console.error('Upload failed:', error);
    }
}

testUpload();