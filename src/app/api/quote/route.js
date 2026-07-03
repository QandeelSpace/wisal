/* C:\Users\ASUS\.gemini\antigravity\scratch\wisal-website\src\app\api\quote\route.js */
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const quotesFilePath = path.join(process.cwd(), "quotes.json");

export async function POST(request) {
  try {
    const data = await request.json();

    // Input Validation
    if (!data.fullName || !data.phone || !data.email) {
      return NextResponse.json(
        { error: "Missing required fields (fullName, phone, email)" },
        { status: 400 }
      );
    }

    // Read existing quotes
    let quotesList = [];
    if (fs.existsSync(quotesFilePath)) {
      try {
        const fileContent = fs.readFileSync(quotesFilePath, "utf8");
        quotesList = JSON.parse(fileContent);
      } catch (err) {
        console.error("Error reading quotes.json, resetting list:", err);
      }
    }

    // Add new quote submission
    const newSubmission = {
      id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...data,
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
      submittedAt: new Date().toISOString()
    };

    quotesList.push(newSubmission);

    // Save back to JSON file (MOCK database representation for MERN stack)
    fs.writeFileSync(quotesFilePath, JSON.stringify(quotesList, null, 2), "utf8");

    console.log("Successfully recorded quote submission:", newSubmission.id);

    return NextResponse.json(
      { success: true, message: "Quote request submitted successfully", submissionId: newSubmission.id },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error handling quote request POST:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Let's allow simple admin viewing of submissions if requested, or return count
    if (fs.existsSync(quotesFilePath)) {
      const fileContent = fs.readFileSync(quotesFilePath, "utf8");
      const quotes = JSON.parse(fileContent);
      return NextResponse.json({ count: quotes.length, submissions: quotes }, { status: 200 });
    }
    return NextResponse.json({ count: 0, submissions: [] }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to read quotes data" }, { status: 500 });
  }
}
