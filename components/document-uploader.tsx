"use client"

import { useCallback } from "react"
import { useDropzone, type FileWithPath } from "react-dropzone"
import { Upload, File } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DocumentUploaderProps {
  onFileAccepted: (acceptedFiles: FileWithPath[]) => void
  onUpload: () => void
  file: FileWithPath | null
  disabled?: boolean
}

export function DocumentUploader({ onFileAccepted, onUpload, file, disabled }: DocumentUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      onFileAccepted(acceptedFiles)
    },
    [onFileAccepted],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/msword": [".doc"],
    },
    maxFiles: 1,
    disabled,
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <h3 className="text-lg font-medium">Drag & drop your document here</h3>
          <p className="text-sm text-muted-foreground">or click to browse (PDF, DOC, DOCX)</p>
        </div>
      </div>

      {file && (
        <div className="p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <File className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium truncate max-w-[250px] md:max-w-md">{file.name}</span>
              <span className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            <Button onClick={onUpload} disabled={disabled}>
              Classify Document
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

