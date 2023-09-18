import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./components/organisms/signup";

import axios from "axios";
import { API_BASE_URL } from "./config";

export const axiosObject = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/signup" element={<Signup />}></Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
