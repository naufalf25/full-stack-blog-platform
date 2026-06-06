import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CreatePost from "./pages/CreatePost";

const PostDetail = () => <div className="p-4 text-2xl">Detail Post Page</div>;
const Profile = () => <div className="p-4 text-2xl">Profile Page</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/:id" element={<PostDetail />} />

            <Route path="/posts/create" element={<CreatePost />} />
            <Route path="/posts/:id/edit" element={<CreatePost />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
