import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";
import util from "util";
import os from "os";
import PDFExtractor from "./fileOperations/pdfExtractor.js";

const execPromise = util.promisify(exec);

function escapeShellArg(arg) {
  return `'${arg.replace(/'/g, "'\\''")}'`;
}

async function uploadFile(filename, userId, workspaceId) {
  const startTime = Date.now();
  let tempFilePath;
  try {
    const filePath = path.join(process.cwd(), "uploads", filename);

    console.log(`Starting to process ${filename}`);

    // Check if file exists
    if (!(await fs.stat(filePath).catch(() => false))) {
      throw new Error(`File not found: ${filePath}`);
    }

    // Parse PDF
    console.time("PDF Extraction");
    const pdfExtractor = new PDFExtractor();
    const parsedText = await pdfExtractor.extractText(filePath);
    console.timeEnd("PDF Extraction");

    if (!parsedText || parsedText.trim().length === 0) {
      throw new Error("Failed to extract text from PDF or PDF is empty");
    }

    // Write parsed text to a temporary file
    tempFilePath = path.join(os.tmpdir(), `parsed_text_${Date.now()}.txt`);
    await fs.writeFile(tempFilePath, parsedText);

    // Process with LlamaModel
    console.time("LlamaModel Processing");
    const llamaScriptPath = path.join(process.cwd(), "app", "llamaModel.py");
    const llamaCommand = `conda run -n ai-tutor python ${escapeShellArg(
      llamaScriptPath
    )} ${escapeShellArg(tempFilePath)}`;
    //For venv use this command
    //const { stdout: llamaOutput, stderr: llamaError } = await execPromise(python3 "${llamaScriptPath}" "${tempFilePath}");

    // For conda use this command:
    const { stdout: llamaOutput, stderr: llamaError } = await execPromise(
      llamaCommand
    );

    if (llamaError) {
      console.error("LlamaModel Error:", llamaError);
      throw new Error("LlamaModel processing failed");
    }

    if (!llamaOutput || llamaOutput.trim().length === 0) {
      throw new Error("LlamaModel processing returned empty result");
    }

    // Upload to Pinecone
    console.time("Pinecone Upload");
    const pineconeScriptPath = path.join(
      process.cwd(),
      "app/pinecone_operations",
      "pinecone_upload.py"
    );
    const documentId = path.basename(filePath, path.extname(filePath));
    const pineconeCommand = `conda run -n ai-tutor python ${escapeShellArg(
      pineconeScriptPath
    )} ${escapeShellArg(userId)} ${escapeShellArg(
      workspaceId
    )} ${escapeShellArg(documentId)} ${escapeShellArg(llamaOutput)}`;
     //For venv use this command
 //const { stdout: pineconeOutput, stderr: pineconeError } = await execPromise(python3 "${pineconeScriptPath}" "${userId}" "${workspaceId}" "${documentId}" '${llamaOutput}');    


    console.log("Executing Pinecone command:", pineconeCommand);

    const { stdout: pineconeOutput, stderr: pineconeError } = await execPromise(
      pineconeCommand
    );
    console.timeEnd("Pinecone Upload");

    if (pineconeError) {
      console.error("Pinecone Upload Error:", pineconeError);
      throw new Error(`Pinecone upload failed: ${pineconeError}`);
    }

    if (!pineconeOutput || pineconeOutput.trim().length === 0) {
      throw new Error("Pinecone upload returned empty result");
    }

    console.log("Pinecone Upload Output:", pineconeOutput);
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
