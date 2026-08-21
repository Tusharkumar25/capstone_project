import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import InterviewSetup from "./pages/InterviewSetup";
import Interview from "./pages/Interview";
import Result from "./pages/Result";

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/interview/setup" element={<InterviewSetup />} />
      <Route path="/interview/:id" element={<Interview />}/>
      <Route path="/interview/:id/result" element={<Result />} />
    </Routes>
  );
}

export default App;