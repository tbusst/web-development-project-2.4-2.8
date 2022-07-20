import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

// Import pages
import Landing from "./Pages/Landing/Landing";
import Home from "./Pages/Home/Home";
import Placeholder from "./Pages/Placeholder";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/Login/Login";
import CreatePost from "./Pages/CreatePost/CreatePost";

//Import scss
import './App.scss'

// Render the app
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Placeholder />} />
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/placeholder" element={<Placeholder />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/new-post" element={<CreatePost />} />
            </Routes>
        </BrowserRouter>
    );
};