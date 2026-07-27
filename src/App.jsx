import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import SundaySchool from "./F/SundaySchool";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/SundaySchool" element={<SundaySchool />} />
    </Routes>
  );
}

export default App;
