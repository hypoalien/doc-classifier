import { DocumentClassifier } from "@/components/document-classifier"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="w-full max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Legal Document Classifier</h1>
          <p className="text-muted-foreground">
            Upload a PDF or Word document to classify it as a Stock Purchase Agreement, Certificate of Incorporation, or
            Investors' Rights Agreement.
          </p>
        </div>

        <DocumentClassifier />
      </div>
    </main>
  )
}

