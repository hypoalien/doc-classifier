"use client";

import { useState } from "react";
import { DocumentUploader } from "./document-uploader";
import { ClassificationResult } from "./classification-result";
import type { FileWithPath } from "react-dropzone";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type DocumentType =
  | "Stock Purchase Agreement"
  | "Certificate of Incorporation"
  | "Investors' Rights Agreement"
  | null;
type ConfidenceType = "High" | "Low" | null;
export function DocumentClassifier() {
  const [file, setFile] = useState<FileWithPath | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [documentType, setDocumentType] = useState<DocumentType>(null);
  const [confidence, setConfidence] = useState<ConfidenceType>(null);

  const [error, setError] = useState<string | null>(null);

  const handleFileAccepted = (acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError(null);
      setDocumentType(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);
    setError(null);

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("document", file);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 10;
          if (newProgress >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return newProgress;
        });
      }, 300);

      // Send the file to the API
      const response = await fetch("/api/classify", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        throw new Error("Failed to classify document");
      }

      const data = await response.json();
      setDocumentType(data.documentType);
      setConfidence(data.confidence);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setDocumentType(null);
    setConfidence(null);
    setError(null);
    setProgress(0);
  };

  return (
    <div className="space-y-6">
      {!documentType && !isProcessing && (
        <DocumentUploader
          onFileAccepted={handleFileAccepted}
          onUpload={handleUpload}
          file={file}
          disabled={isProcessing}
        />
      )}

      {isProcessing && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Processing document...</h3>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground">
            Analyzing content and determining document type...
          </p>
        </div>
      )}

      {documentType && confidence && (
        <ClassificationResult
          confidence={confidence}
          documentType={documentType}
          fileName={file?.name || ""}
          onReset={handleReset}
        />
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
