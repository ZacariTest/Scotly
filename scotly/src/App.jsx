import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CourseCocina from "./pages/CourseCocina";
import CourseArte from "./pages/CourseArte";
import CourseHistoria from "./pages/HistoriaCapitulo";
import CourseMitologia from "./pages/CourseMitologia";
import CourseHistory from "./pages/CourseHistory";
import Shop from "./pages/Shop";
import InvasionPage from "./pages/InvasionPage";
import SobreNosotros from "./pages/SobreNosotros";
import Donaciones from "./pages/Donaciones";
import Cursos from "./pages/Cursos";
import ProfilePage from "./pages/ProfilePage";

// ── Players (nuevo) ──
import CourseArtePlayer     from "./pages/CourseArtePlayer";
import CourseCocinaPlayer   from "./pages/CourseCocinaPlayer";
import CourseHistoryPlayer  from "./pages/CourseHistoryPlayer";
import CourseMitologiaPlayer from "./pages/CourseMitologiaPlayer";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/curso/cocina"    element={<CourseCocina />} />
      <Route path="/curso/arte"      element={<CourseArte />} />
      <Route path="/curso/historia"  element={<CourseHistoria />} />
      <Route path="/curso/mitologia" element={<CourseMitologia />} />
      <Route path="/curso/history"   element={<CourseHistory />} />

      {/* ── Players (nuevo) ── */}
      <Route path="/curso/arte/player"      element={<CourseArtePlayer />} />
      <Route path="/curso/cocina/player"    element={<CourseCocinaPlayer />} />
      <Route path="/curso/history/player"   element={<CourseHistoryPlayer />} />
      <Route path="/curso/mitologia/player" element={<CourseMitologiaPlayer />} />

      <Route path="/shop"           element={<Shop />} />
      <Route path="/invasion"       element={<InvasionPage />} />
      <Route path="/sobre-nosotros" element={<SobreNosotros />} />
      <Route path="/donaciones"     element={<Donaciones />} />
      <Route path="/cursos"         element={<Cursos />} />
      <Route path="/perfil"         element={<ProfilePage />} />
    </Routes>
  );
}