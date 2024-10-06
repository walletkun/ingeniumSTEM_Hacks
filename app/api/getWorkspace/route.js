import { NextResponse } from "next/server";
import { db, auth } from "@/firebaseAdmin"; // Import Firestore and Auth

export async function GET(req) {
  try {
    // Extract the Authorization header
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "You need to be logged in to fetch workspaces" },
        { status: 401 }
      );
    }

    // Extract the token from the header
    const token = authHeader.split("Bearer ")[1];

    // Verify the token with Firebase Admin SDK
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;
    // Extract the query parameter for the workspace title
    const { searchParams } = new URL(req.url);
    console.log("searchParams", searchParams);
    const name = searchParams.get("title");

    if (!name) {
      return NextResponse.json(
        { error: "Workspace title is required" },
        { status: 400 }
      );
    }

    console.log("Querying workspace with title:", name);

    //This is used for testing, to see if workspace even exists
    const allWorkspacesRef = db.collection("users").doc(userId).collection('workspaces').where("userId", "==", userId);
    const allSnapshots = await allWorkspacesRef.get();
    allSnapshots.forEach(doc => {
      console.log(`Found workspace: ${doc.data().title} with ID: ${doc.id}`);
    });


    // Fetch workspace from Firestore
    const workspaceRef = db
      .collection('users')
      .doc(userId)
      .collection("workspaces")
      .where("userId", "==", userId)
      .where("title", "==", name);
    const snapshot = await workspaceRef.get();

    if (snapshot.empty) {
      return NextResponse.json(
        { error: "No workspace found" },
        { status: 404 }
      );
    }

    const workspaceData = snapshot.docs[0].data() // Assuming only one result

    return NextResponse.json(
      {
        createdAt: workspaceData.createdAt.toDate(),
        fileUrls: workspaceData.fileUrls || [],
        title: workspaceData.title,
        userId: workspaceData.userId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching workspace:", error);
    return NextResponse.json(
      { error: "Failed to fetch workspace" },
      { status: 500 }
    );
  }
}
