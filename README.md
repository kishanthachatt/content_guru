Content Guru - Next.js CMS application with Redux Toolkit and OpenAI Integration

Project Overview :
This is a content management system (CMS) built using Next.js, Redux Toolkit for state management, TypeScript for type-safe coding, MongoDB for data storage, and integrated with OpenAI's API for text enhancements. Users can submit text content, which can be enhanced using OpenAI's text completion or editing capabilities. The application allows users to view, edit, and delete submissions.

Features :

    - Homepage listing all submitted content with options to view, edit, or delete each entry.
    - Editor page for submitting new content or editing existing content.
    - Basic user authentication (login/logout) to manage sessions.
    - Secure RESTful API endpoints for CRUD operations on content using basic authentication or JWT tokens.
    - MongoDB integration for storing user and content data.
    - Redux Toolkit for handling application state, including user session and content data.
    - Asynchronous actions for fetching data from the API.
    - OpenAI API integration in the editor page for content suggestions or enhancements.
    - TypeScript used throughout for type-safe coding.
    - Basic unit tests for frontend components and Redux slices.
    - Integration tests for API endpoints.

Setup Instructions :

    Setp 1 : git clone https://github.com/kishanthachatt/content_guru
    Setp 2 : cd content_guru -> npm install
    Setp 3 : Create a .env file in root folder
    Setp 4 : npm run dev
    Setp 5 : Open your browser and navigate to http://localhost:3000.

API Documentation :

    Authentication
        POST /api/auth/login: Log in with username and password. Returns a JWT token upon successful authentication.
        POST /api/auth/logout: Log out and invalidate the current session.
    Content
        GET /api/content: Retrieve all submitted content.
        POST /api/content: Submit new content.
        GET /api/content/:id: Retrieve a specific content entry by ID.
        PUT /api/content/:id: Update an existing content entry.
        DELETE /api/content/:id: Delete a content entry by ID.
    OpenAi
        POST /api/openai: Retrive data from open ai regarding your prompt.

Test Case :
To run test-case : npm run test
