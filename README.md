
---

# Legal Document Classifier

A web application designed to classify legal documents into specific categories using AI-powered content analysis.

## Overview

This project uses Next.js for the frontend, Vercel for hosting, and shadcn UI components for styling. It leverages OpenAI's GPT-4o model to classify documents as either Stock Purchase Agreements, Certificates of Incorporation, or Investors' Rights Agreements.

## Features

- **Document Upload**: Users can upload PDF or Word documents (.docx, .doc) for classification.
- **AI Classification**: Documents are analyzed using OpenAI's GPT-4o model to determine their type.
- **Confidence Indicator**: The system provides a confidence level for each classification, indicating how reliable the result is.
- **Progress Tracking**: Users can track the progress of the document analysis process.

## Requirements

- Node.js (for development)
- Next.js (for building and running the application)
- Vercel (for hosting)
- OpenAI API key (for AI functionality)

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo-url/impact-venture.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Set up an OpenAI API key and configure it in your environment variables.

## Deployment

This application is designed to be deployed on Vercel. Follow Vercel's documentation for setting up and deploying Next.js applications.

## Contributing

Contributions are welcome! Please submit pull requests with clear descriptions of changes.

## License

MIT
