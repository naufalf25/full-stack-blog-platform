# Blog Application API - Back-End

This project is the Back-End RESTful API for a Full-Stack Blog application. It is built using Node.js, Express.js, TypeScript, and MongoDB. The API supports secure user authentication via JSON Web Tokens (JWT) and provides full CRUD (Create, Read, Update, Delete) operations for managing blog posts and their associated comments.

## 🚀 Setup and Installation

Ensure you have Node.js installed and a running instance of MongoDB (either locally or via MongoDB Atlas).

1. **Clone the repository:**
  ```bash
    git clone https://github.com/naufalf25/full-stack-blog-platform
    cd backend
  ```

2. **Install dependencies:**
  ```bash
    npm install
  ```

3. **Configure Environment Variables:**
  Create a .env file in the root directory and add the following variables:
  ```codesnippet
    PORT=5000
    MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net
    JWT_SECRET=your_super_secret_jwt_key_here  
  ```
4. **Run the Development Server:**
  ```bash
    node src/server.ts
  ```
  The server should now be running at http://localhost:5000.

## 📡 API Endpoints & Interaction
The API consumes and produces JSON. For endpoints that require authentication, you must include the JWT token in the request header:
`Authorization: Bearer <your_jwt_token>`

1. **User Authentication**

  | Method | Endpoint         | Description                                                      | Auth Required |
  | :----- | :--------------- | :--------------------------------------------------------------- | :-----------: |
  | POST   | `/auth/register` | Register a new user                                              |       ❌       |
  | POST   | `/auth/login`    | Authenticate user and receive a JWT token                        |       ❌       |
  | POST   | `/auth/logout`   | Dummy endpoint for logout (actual logout handled on client-side) |       ❌       |

2. **Post Management**

  | Method | Endpoint     | Description                        | Auth Required |
  | :----- | :----------- | :--------------------------------- | :-----------: |
  | GET    | `/posts`     | Retrieve all blog posts            |       ❌       |
  | GET    | `/posts/:id` | Retrieve a specific post by its ID |       ❌       |
  | POST   | `/posts`     | Create a new blog post             |       ✅       |
  | PUT    | `/posts/:id` | Update an existing post            |       ✅       |
  | DELETE | `/posts/:id` | Delete a post                      |       ✅       |

3. **Comment Management**

  | Method | Endpoint              | Description                                           | Auth Required |
  | :----- | :-------------------- | :---------------------------------------------------- | :-----------: |
  | GET    | `/posts/:id/comments` | Retrieve all comments associated with a specific post |       ❌       |
  | POST   | `/posts/:id/comments` | Add a new comment to a post                           |       ✅       |
  | PUT    | `/comments/:id`       | Edit an existing comment                              |       ✅       |
  | DELETE | `/comments/:id`       | Delete a comment                                      |       ✅       |

## 🧠 Assumptions & Design Decisions

1. TypeScript Integration: TypeScript was chosen to enforce static typing, minimize runtime errors, and provide a clearer structure for data payloads (like the custom req.user property inside the Auth Middleware).
2. Non-Relational Database (MongoDB): Selected for its flexibility in handling dynamic document schemas. Mongoose is utilized as the Object Data Modeling (ODM) library to enforce schema validation and manage relationships between Users, Posts, and Comments.
3. Stateless Authentication (JWT): Tokens are not stored in the server database; instead, they are validated via cryptographic signatures. This makes the API lightweight and highly scalable. As a result, the `/api/auth/logout` endpoint does not perform backend operations; clearing the token is explicitly the responsibility of the Client/Front-End.
4. Layered Authorization Validation: For sensitive operations (PUT/DELETE), the API not only verifies the validity of the JWT token but also cross-checks the decoded `User ID` against the `author` field in the MongoDB document. This ensures users can only modify or delete their own data.