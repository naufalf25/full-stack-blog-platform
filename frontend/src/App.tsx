import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = () => <div className="p-4 text-2xl">Home Page</div>;
const Login = () => <div className="p-4 text-2xl">Login Page</div>;
const Register = () => <div className="p-4 text-2xl">Register Page</div>;
const PostDetail = () => <div className="p-4 text-2xl">Detail Post Page</div>;
const CreatePost = () => <div className="p-4 text-2xl">Create Post Page</div>;
const Profile = () => <div className="p-4 text-2xl">Profile Page</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:id" element={<PostDetail />} />

          <Route path="/post/create" element={<CreatePost />} />
          <Route path="/post/:id/edit" element={<CreatePost />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
