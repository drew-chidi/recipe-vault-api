# Recipe Vault API

**Recipe Vault** is a backend service that powers a web application for discovering, creating, and sharing recipes. This backend handles API requests, manages the database, and performs other server-side tasks to support recipe management.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Deployment Link](#deployment)
- [Contact](#contact)

## Features

- **Recipe Management**: Supports CRUD operations for managing recipes, including adding, updating, and deleting recipes.
- **Pagination**: API supports pagination for fetching recipe lists.
- **Media Storage**: Integration with Cloudinary for image and video uploads related to recipes.
- **Error Handling**: Comprehensive error handling for API requests.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 14 or higher)
- [npm](https://www.npmjs.com/get-npm) or [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/drew-chidi/recipe-vault-api.git

   ```

2. Navigate to the project directory:

   ```bash
   cd recipe-vault-api

   ```

3. Install the dependencies:

   ```bash
   npm install

   ```

4. Create a .env file in the root directory and add your environment variables, including MongoDB URI and Cloudinary credentials:

   ```bash
   MONGODB_URI=your_mongodb_uri
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

### Running the App

```bash
npm run dev
```

## Deployment Link

[Recipe Vault](https://recipe-vault-web.vercel.app/)
[Recipe Vault API documentation](https://documenter.getpostman.com/view/19302224/2sAXjRWVP5)

## Contact

For any inquiries or feedback, feel free to reach out:

- Author: Andrew Ofuenweuche
- Email: chidi.andrew@gmail.com

username: pci-qs
