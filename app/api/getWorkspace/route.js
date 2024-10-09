import { NextResponse } from "next/server";
import { db, auth } from "@/firebaseAdmin";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "You need to be logged in to fetch workspaces" },
        { status: 401 }
      );
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const { searchParams } = new URL(req.url);
    const name = searchParams.get("title");

    console.log("Querying workspaces for user:", userId);
    console.log("Requested workspace title:", name || "All workspaces");

    let workspaceRef = db
      .collection('users')
      .doc(userId)
      .collection("workspaces")
      .where("userId", "==", userId);

    if (name) {
      workspaceRef = workspaceRef.where("title", "==", name);
    }

    const snapshot = await workspaceRef.get();

    console.log("Snapshot empty:", snapshot.empty);

    if (snapshot.empty) {
      console.log("No workspaces found for user:", userId);
      return NextResponse.json(
        { workspaces: [] },
        { status: 200 }
      );
    }

    const workspaces = snapshot.docs.map(doc => {
      const data = doc.data();
      console.log("Workspace data:", data);
      return {
        id: doc.id,
        title: data.title,
        createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
        fileUrls: data.fileUrls || [],
        userId: data.userId,
      }
    });

    console.log("Returning workspaces:", workspaces);
    return NextResponse.json(
      { workspaces },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching workspace:", error);
    return NextResponse.json(
      { error: "Failed to fetch workspace: " + error.message },
      { status: 500 }
    );
  }
}