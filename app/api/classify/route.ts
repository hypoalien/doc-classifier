import { type NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { getTextExtractor } from "office-text-extractor";
import { limitTextForTokens } from "@/lib/utils";
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("document") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No document provided" },
        { status: 400 }
      );
    }

    // Check file type
    const fileType = file.type;
    if (
      fileType !== "application/pdf" &&
      fileType !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
      fileType !== "application/msword"
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid file type. Only PDF and Word documents are supported.",
        },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text using office-text-extractor
    const extractor = getTextExtractor();
    const documentText = await extractor.extractText({
      input: buffer,
      type: "buffer",
    });
    // Truncate documentText to fit within token limit
    const limitedDocumentText = limitTextForTokens(documentText, 15000); // Safe limit for gpt-4o

    // Use AI to classify the document based on the extracted content
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `You are a legal document classifier. Based on the following document content, classify it as one of these types:
        - Stock Purchase Agreement
        - Certificate of Incorporation
        - Investors' Rights Agreement
        
        Provide only the exact classification name from the list above. If you cannot determine the type with confidence, respond with "Unclassified Document".
        
        Document content:
        ${limitedDocumentText}`,
    });
    console.log("Open Ai response", text);
    // Clean up the AI response to match one of our expected types
    let documentType;
    if (text.includes("Stock Purchase Agreement")) {
      documentType = "Stock Purchase Agreement";
    } else if (text.includes("Certificate of Incorporation")) {
      documentType = "Certificate of Incorporation";
    } else if (text.includes("Investors' Rights Agreement")) {
      documentType = "Investors' Rights Agreement";
    } else {
      documentType = "Unclassified Document";
    }

    return NextResponse.json({
      documentType,
      confidence: text.includes("Unclassified") ? "low" : "high",
    });
  } catch (error) {
    console.error("Error classifying document:", error);
    return NextResponse.json(
      { error: "Failed to process document" },
      { status: 500 }
    );
  }
}
