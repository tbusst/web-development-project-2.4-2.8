import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Home from "./Pages/Home/Home";
import './App.scss'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};