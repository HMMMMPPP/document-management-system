# Document Management System

A secure file upload and version control system built with React, Node.js, and AWS S3.

## Features

- **Secure Uploads**: Direct-to-S3 uploads using Presigned URLs.
- **Version Control**: View and manage file versions (powered by S3 Versioning).
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS v4.

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript, AWS SDK v3
- **Storage**: AWS S3

## Prerequisites

- Node.js (v18+)
- AWS Account with an S3 Bucket (Versioning enabled, CORS configured)

## Getting Started

### 1. Setup Backend

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment variables:
    Create a `.env` file in `server/` with the following:
    ```env
    PORT=3000
    AWS_REGION=your-region
    AWS_ACCESS_KEY_ID=your-access-key
    AWS_SECRET_ACCESS_KEY=your-secret-key
    AWS_BUCKET_NAME=your-bucket-name
    ```

### 2. Setup Frontend

1.  Navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### 3. Run the Application

1.  Start the backend server:
    ```bash
    # In server terminal
    npm run dev
    ```
2.  Start the frontend development server:
    ```bash
    # In client terminal
    npm run dev
    ```
3.  Open [http://localhost:5173](http://localhost:5173) in your browser.
