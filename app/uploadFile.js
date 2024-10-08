import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';
import os from 'os';
import PDFExtractor from './fileOperations/pdfExtractor.js';

const execPromise = util.promisify(exec);

async function uploadFile(filename, userId, workspaceId) {
    const startTime = Date.now();
    let tempFilePath;
    try {
        const filePath = path.join(process.cwd(), 'uploads', filename);
        
        console.log(`Starting to process ${filename}`);

        // Parse PDF
        console.time('PDF Extraction');
        const pdfExtractor = new PDFExtractor();
        const parsedText = await pdfExtractor.extractText(filePath);
        console.timeEnd('PDF Extraction');
        
        // Write parsed text to a temporary file
        tempFilePath = path.join(os.tmpdir(), `parsed_text_${Date.now()}.txt`);
        await fs.writeFile(tempFilePath, parsedText);
        
        // Process with LlamaModel
        console.time('LlamaModel Processing');
        const llamaScriptPath = path.join(process.cwd(), 'llamaModel.py');
        const { stdout: llamaOutput, stderr: llamaError } = await execPromise(`python3 "${llamaScriptPath}" "${tempFilePath}"`);
        console.timeEnd('LlamaModel Processing');
        
        if (llamaError) {
            console.error('LlamaModel Error:', llamaError);
            throw new Error('LlamaModel processing failed');
        }

        // Upload to Pinecone
        console.time('Pinecone Upload');
        const pineconeScriptPath = path.join(process.cwd(), 'pinecone_operations', 'pinecone_upload.py');
        const documentId = path.basename(filePath, path.extname(filePath));
        const { stdout: pineconeOutput, stderr: pineconeError } = await execPromise(
            `python3 "${pineconeScriptPath}" "${userId}" "${workspaceId}" "${documentId}" '${llamaOutput}'`
        );
        console.timeEnd('Pinecone Upload');
        
        if (pineconeError) {
            console.error('Pinecone Upload Error:', pineconeError);
            throw new Error('Pinecone upload failed');
        }

        const totalTime = (Date.now() - startTime) / 1000;
        console.log(`Total processing time: ${totalTime} seconds`);

        return { parsedText, llamaOutput, pineconeOutput };
    } catch (error) {
        console.error(`Error processing file ${filename}:`, error);
        throw error;
    } finally {
        // Clean up the temporary file
        if (tempFilePath) {
            await fs.unlink(tempFilePath).catch(console.error);
        }
    }
}

export default uploadFile;