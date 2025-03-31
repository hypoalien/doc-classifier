"use client";

import { CheckCircle2, FileText, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ClassificationResultProps {
  documentType: string;
  fileName: string;
  confidence: string | null;
  onReset: () => void;
}

export function ClassificationResult({
  documentType,
  fileName,
  onReset,
  confidence,
}: ClassificationResultProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <CardTitle>Classification Complete</CardTitle>
        </div>
        <CardDescription>
          We&apos;ve analyzed your document and determined its type
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground truncate max-w-[300px] md:max-w-md">
              {fileName}
            </span>
          </div>

          <div className="p-4 bg-primary/10 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium">Document Type:</h3>
              {confidence && (
                <Badge
                  variant={confidence === "high" ? "default" : "secondary"}
                  className={
                    confidence === "high" ? "bg-green-500" : "bg-amber-500"
                  }
                >
                  {confidence === "high" ? "High Confidence" : "Low Confidence"}
                </Badge>
              )}
            </div>
            <p className="text-xl font-bold text-primary">{documentType}</p>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>
              This classification is based on the content analysis of your
              document.{" "}
              {confidence === "low" &&
                "The system has low confidence in this classification - "}
              If you believe this classification is incorrect, please try
              uploading a clearer version of the document.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onReset} variant="outline" className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Classify Another Document
        </Button>
      </CardFooter>
    </Card>
  );
}
