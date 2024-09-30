import { NextResponse } from"next/server";
import { db } from "@/firebase";
import {collection, getDocs} from "firebase/firestore";

export async function GET(req) {
  try {
    // Reference the 'chats' collection
    const chatsCollection = collection(db, "chats");
    // Fetch documents from the collection
    const chatSnapshot = await getDocs(chatsCollection);
    // Map documents to include IDs and data
    const chatList = chatSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    // Send the chat list as a JSON response
    return NextResponse.json(chatList, { status: 200 });
  } catch (error) {
    console.error("Error fetching chats:", error);
    // Send an error response if fetching fails
    return NextResponse.json({ error: "Failed to fetch chats" }, { status: 500 });
  }
}
