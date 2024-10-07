import { NextResponse } from "next/server";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function DELETE(req) {
  const data = await req.json();
  console.log(data);

  try {
    const docRef = await addDoc(collection(db, "chats"), { title, messages });
    const auth = getAuth();
    const user = auth.currentUser;

    if(!user){
        return NextResponse.json({ error: "You need to be logged in to fetch chats" }, { status: 401 });
    }
    return NextResponse.json({ id: docRef.id }, { status: 200 });
  } catch (e) {
    console.error("Error saving chat:", e);
    return NextResponse.json({ error: "Failed to save chat" }, { status: 500 });
  }
}
