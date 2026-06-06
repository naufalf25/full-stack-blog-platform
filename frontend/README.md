# Blog Application - Front-End

This project is the Front-End interface for the Full-Stack Blog Application, built to provide a fast, responsive, and modern user experience. It consumes the RESTful API provided by the Back-End service to manage user authentication, blog posts, and comments.

## 🛠️ Tech Stack

*   **Framework:** React 18
*   **Build Tool:** Vite
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Routing:** React Router DOM
*   **HTTP Client:** Axios (configured with interceptors for JWT token handling)

## ✨ Features

*   **User Authentication:** Secure registration and login flow using JWT stored in `localStorage`.
*   **Responsive Design:** Fully responsive layout that works seamlessly across desktop, tablet, and mobile devices using Tailwind CSS utility classes.
*   **Post Management:** Users can view all posts on the home page and read full details on a dedicated post page.
*   **Author Capabilities:** Authenticated users can create new posts, and only authors have the permission to edit or delete their own posts.
*   **Commenting System:** Logged-in users can engage with content by adding comments. Authors can edit or delete their own comments.
*   **User Profile:** A dedicated profile page displaying the logged-in user's information and a curated list of posts they have authored.

## 🚀 Setup and Installation (Local Development)

### Prerequisites
*   Node.js (v16 or higher recommended)
*   The **Back-End API** must be running locally (usually on port 5000) for data fetching to work correctly.

### Installation Steps

1. **Clone the repository:**

  ```bash
    git clone [<your-frontend-repository-link>](https://github.com/naufalf25/full-stack-blog-platform)
    cd frontend
  ```

2. **Install dependencies:**

  ```bash
    npm install
  ```

3. **Configure API Endpoint:**

  By default, the Axios instance in `src/utils/axios.ts` is configured to point to `http://localhost:5000/api`. If your Back-End runs on a different port, please update the VITE_API_URL in `.env` file.

4. **Start the Development Server:**

  ```bash
    npm run dev
  ```
  The application will typically start on `http://localhost:5173`. Open this URL in your browser to view the app.

## 📁 Project Structure

* `src/components/`: Reusable UI components (e.g., Navbar.tsx).
* `src/pages/`: Main route components representing different views (Home.tsx, Login.tsx, PostDetail.tsx, etc.).
* `src/utils/`: Utility functions and configurations (e.g., axios.ts for centralized API requests and token interception).
* `src/App.tsx`: Main application component handling the React Router setup.

## 🚢 Deployment

This project is optimized for deployment on modern static hosting platforms.
To build the project for production, run:

```bash
  npm run build
```
The output will be generated in the `dist` folder, which can be directly deployed to platforms like **Vercel**, **Netlify**, etc.