import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { SpellList } from "./pages/SpellList";
import { SpellDetail } from "./pages/SpellDetail";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="spells" element={<SpellList />} />
        <Route path="spells/:id" element={<SpellDetail />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
