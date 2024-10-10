import { NextResponse } from "next/server";
import { db, auth } from "@/firebaseAdmin";

export async function DELETE(req) {
  console.log("Received DELETE request to /api/deleteWorkspace");

  try {
    // Get the Authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Invalid or missing Authorization header" },
        { status: 401 }
      );
    }

    // Verify the token
    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    // Get the workspaceId from the request body
    const { workspaceId } = await req.json();

    if (!workspaceId) {
      return NextResponse.json(
        { error: "Workspace ID is required" },
        { status: 400 }
      );
    }

    // Get the workspace document
    const workspaceRef = db.collection("workspaces").doc(workspaceId);
    const workspaceDoc = await workspaceRef.get();

    if (!workspaceDoc.exists) {
      return NextResponse.json(
        { error: "Workspace not found" },
        { status: 404 }
      );
    }

    // Check if the user has permission to delete the workspace
    const workspaceData = workspaceDoc.data();
    if (workspaceData.createdBy !== userId) {
      return NextResponse.json(
        { error: "You don't have permission to delete this workspace" },
        { status: 403 }
      );
    }

    // Delete the workspace
    await workspaceRef.delete();

    console.log(`Workspace ${workspaceId} deleted successfully`);
    return NextResponse.json(
      { message: "Workspace deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting workspace:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the workspace" },
      { status: 500 }
    );
  }
}