import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ChapterReader from "./pages/ChapterReader";
import CharacterGraph from "./pages/CharacterGraph";
import ForeshadowingBoard from "./pages/ForeshadowingBoard";
import WorldbuildingBrowser from "./pages/WorldbuildingBrowser";
import QualityDashboard from "./pages/QualityDashboard";
import WritingStats from "./pages/WritingStats";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/chapters" element={<ChapterReader />} />
        <Route path="/chapters/:number" element={<ChapterReader />} />
        <Route path="/characters" element={<CharacterGraph />} />
        <Route path="/foreshadowing" element={<ForeshadowingBoard />} />
        <Route path="/worldbuilding" element={<WorldbuildingBrowser />} />
        <Route path="/quality" element={<QualityDashboard />} />
        <Route path="/stats" element={<WritingStats />} />
      </Routes>
    </Layout>
  );
}
