import { NextResponse } from "next/server";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import next from "next";

export async function GET(req) {

  const auth = getAuth();
  const user = auth.currentUser;

  if(!user) {
    return NextResponse.json(
      { error: "You need to be logged in to fetch workspaces" },
      { status: 401 }
    );
  }
  
  try {
    const workspaceRef = collection(db, "workspaces");
    const workspaceDoc = await getDocs(workspaceRef);

    const workspace = []

    workspaceDoc.forEach(doc => {
      workspace.push(doc.data());
    });

    return NextResponse.json(workspace, { status: 200 });
  }
  catch (e) {
    console.error("Error fetching workspaces:", e);
    return NextResponse.json({ error: "Failed to fetch workspaces" }, { status: 500 });
  }
}
