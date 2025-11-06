import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";

function App() {
  const [userRole, setUserRole] = useState<string | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUserRole={setUserRole} />} />
        <Route path="/dashboard" element={<Dashboard role={userRole ?? ''} />} />
      </Routes>
    </Router>
  );
}

export default App;
