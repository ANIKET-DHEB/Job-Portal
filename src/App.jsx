import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FrontendDetails from "./pages/FrontendDetails"
import BackendDetails from "./pages/BackendDetails"
import { Routes, Route } from "react-router-dom";
import FullstackDetails from "./pages/FullstackDeveloper";
import JavaDetails from "./pages/JavaDetails";
import FlutterDetails from "./pages/FlutterDetails";
import PhpDetails from "./pages/PhpDetails";
import ApplyJob from "./pages/ApplyJob";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/frontend" element={<FrontendDetails />} />
        <Route path="/backend" element={<BackendDetails/>}/>
        <Route path="/fullstack" element={<FullstackDetails/>}/>
        <Route path="/java" element={<JavaDetails/>}/>
        <Route path="/flutter" element={<FlutterDetails/>}/>
        <Route path="/php" element={<PhpDetails/>}/>
        <Route path="/apply" element={<ApplyJob />} />
      </Routes>
    </>
  );
}

export default App;