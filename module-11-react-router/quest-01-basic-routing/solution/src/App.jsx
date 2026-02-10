import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Students } from "./pages/Students";
import { Spells } from "./pages/Spells";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="students" element={<Students />} />
        <Route path="spells" element={<Spells />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
