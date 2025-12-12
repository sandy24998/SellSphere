import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import CandidateDashboard from "./pages/CandidateDashboard";
import AddCandidate from "./pages/AddCandidate";
import CandidateList from "./pages/CandidateList";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="app">
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/candidates" replace />} />
            <Route path="/candidates" element={<CandidateDashboard />} />
            <Route path="/candidates/add" element={<AddCandidate />} />
            <Route path="/candidates/list" element={<CandidateList />} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
