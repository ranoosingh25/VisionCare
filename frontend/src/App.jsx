import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages import
import Home from "./pages/Home";
import Login from "./pages/Login";
import Donate from "./pages/Donate";
import Appointment from "./pages/Appointment";
import Treatments from "./pages/Treatments";
import Doctors from "./pages/Doctors";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Aboutus from "./pages/Aboutus";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";



function App() {
  return (
    <>
      <Navbar />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        <Route path="/donate" element={<ProtectedRoute><Donate /></ProtectedRoute>} />
        <Route path="/appointment" element={<ProtectedRoute><Appointment /></ProtectedRoute>} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/treatments" element={<Treatments />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/register" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
