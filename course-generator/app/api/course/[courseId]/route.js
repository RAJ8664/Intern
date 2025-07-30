import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req, context) {
	try {
		const params = await context.params;
		const result = await db
			.select()
			.from(CourseList)
			.where(eq(CourseList.courseID, params.courseId));
		console.log("Course fetched:", result);
		if (result.length === 0) {
			return NextResponse.json({ error: "Course not found" }, { status: 404 });
		}
		return NextResponse.json(result);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Failed to fetch course" },
			{ status: 500 },
		);
	}
}
