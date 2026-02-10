import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { SpellList } from "./pages/SpellList";
import { SpellDetail } from "./pages/SpellDetail";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="spells" element={<SpellList />} />
        <Route path="spells/:id" element={<SpellDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
