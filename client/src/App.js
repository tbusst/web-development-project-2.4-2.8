import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Landing from "./Pages/Landing/Landing";
import Home from "./Pages/Home/Home";
import Placeholder from "./Pages/Placeholder";
import Profile from "./Pages/Profile/Profile";
import './App.scss'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Placeholder />} />
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/placeholder" element={<Placeholder />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
};