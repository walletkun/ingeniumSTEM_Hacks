import { NextResponse } from "next/server";
import { db, auth, storage } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { uploadBytes, getDownloadURL} from "firebase/storage";


export async function POST(req) {
  try{
    const {workspaceId, file} = await req.json();

    if(!workspaceId || !file){
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    //Conver to base64 file to a blob
    const response = await fetch(file);
    const blob = await response.blob();

    //Create a storage reference for the file
    const storageRef = ref(storage, `workspaces/${workspaceId}/${file.name}`);

    //Upload the file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, blob);

    //Get the download URL for the uploaded file
    const downloadURL = await getDownloadURL(snapshot.ref);

    //Store the file metadata in Firestore
    await addDoc(collection(db, "workspaces", workspaceId, "documents"), {
      title: file.name,
      url: downloadURL,
      uploadedAt: new Date(),
    });

    return NextResponse.json({ message: "File uploaded successfully", fileURL: downloadURL }, { status: 200});
  }
  catch(e){
    console.error("Error saving documents:", e);
    return NextResponse.json({ error: "Failed to save document" }, { status: 500 });
  }
}
