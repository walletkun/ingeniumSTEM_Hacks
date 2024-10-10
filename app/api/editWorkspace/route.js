import { NextResponse } from "next/server";
import { db, auth } from "@/firebaseAdmin";

export async function PUT(req) {
  console.log("Received PUT request to /api/editWorkspace");

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Invalid or missing Authorization header" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const { workspaceId, title } = await req.json();

    if (!workspaceId || !title) {
      return NextResponse.json({ error: "Workspace ID and title are required" }, { status: 400 });
    }

    // Get the workspace reference
    const workspaceRef = db.collection("users").doc(userId).collection("workspaces").doc(workspaceId);

    // Update the workspace title
    await workspaceRef.update({
      title: title,
      updatedAt: new Date(),
    });

    // Fetch the updated workspace data
    const updatedWorkspaceSnapshot = await workspaceRef.get();
    const updatedWorkspaceData = updatedWorkspaceSnapshot.data();

    return NextResponse.json(
      {
        message: "Workspace updated successfully",
        workspace: {
          id: workspaceId,
          title: updatedWorkspaceData.title,
          updatedAt: updatedWorkspaceData.updatedAt.toDate().toISOString(),
          userId: updatedWorkspaceData.userId,
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PUT /api/editWorkspace:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}