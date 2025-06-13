// src/app/api/chapter/[courseId]/[chapterId]/route.js
import { db } from "@/configs/db";
import { Chapters } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { courseId, chapterId } = params;

    // Perform the database query safely on the server
    const result = await db
      .select()
      .from(Chapters)
      .where(
        and(
          eq(Chapters.courseID, courseId),
          eq(Chapters.chapterId, parseInt(chapterId, 10))
        )
      );

    if (result.length === 0) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch chapter" },
      { status: 500 }
    );
  }
}

