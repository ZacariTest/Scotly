import { Routes, Route } from "react-router-dom";
import { useScrollToTop } from "./hooks/useScrollToTop";
import Home from "./pages/Home";
import Cursos from "./pages/Cursos";
import ProfilePage from "./pages/ProfilePage";
import Shop from "./pages/Shop";
import InvasionPage from "./pages/InvasionPage";
import SobreNosotros from "./pages/SobreNosotros";
import Donaciones from "./pages/Donaciones";

// ── Escocia ──
import CourseArte            from "./pages/CourseArte";
import CourseArtePlayer      from "./pages/CourseArtePlayer";
import CourseCocina          from "./pages/CourseCocina";
import CourseCocinaPlayer    from "./pages/CourseCocinaPlayer";
import CourseHistory         from "./pages/CourseHistory";
import CourseHistoryPlayer   from "./pages/CourseHistoryPlayer";
import CourseMitologia       from "./pages/CourseMitologia";
import CourseMitologiaPlayer from "./pages/CourseMitologiaPlayer";
import CourseHistoria        from "./pages/HistoriaCapitulo";

// ── Inglaterra ──
import CourseEnglandArte            from "./pages/CourseEnglandArte";
import CourseEnglandArtePlayer      from "./pages/CourseEnglandArtePlayer";
import CourseEnglandCocina          from "./pages/CourseEnglandCocina";
import CourseEnglandCocinaPlayer    from "./pages/CourseEnglandCocinaPlayer";
import CourseEnglandHistory         from "./pages/CourseEnglandHistory";
import CourseEnglandHistoryPlayer   from "./pages/CourseEnglandHistoryPlayer";
import CourseEnglandMitologia       from "./pages/CourseEnglandMitologia";
import CourseEnglandMitologiaPlayer from "./pages/CourseEnglandMitologiaPlayer";

export default function App() {
  useScrollToTop();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cursos" element={<Cursos />} />
      <Route path="/perfil" element={<ProfilePage />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/invasion" element={<InvasionPage />} />
      <Route path="/sobre-nosotros" element={<SobreNosotros />} />
      <Route path="/donaciones" element={<Donaciones />} />

      {/* ── Escocia ── */}
      <Route path="/curso/arte"             element={<CourseArte />} />
      <Route path="/curso/arte/player"      element={<CourseArtePlayer />} />
      <Route path="/curso/cocina"           element={<CourseCocina />} />
      <Route path="/curso/cocina/player"    element={<CourseCocinaPlayer />} />
      <Route path="/curso/history"          element={<CourseHistory />} />
      <Route path="/curso/history/player"   element={<CourseHistoryPlayer />} />
      <Route path="/curso/mitologia"        element={<CourseMitologia />} />
      <Route path="/curso/mitologia/player" element={<CourseMitologiaPlayer />} />
      <Route path="/curso/historia"         element={<CourseHistoria />} />

      {/* ── Inglaterra ── */}
      <Route path="/curso/england/arte"             element={<CourseEnglandArte />} />
      <Route path="/curso/england/arte/player"      element={<CourseEnglandArtePlayer />} />
      <Route path="/curso/england/cocina"           element={<CourseEnglandCocina />} />
      <Route path="/curso/england/cocina/player"    element={<CourseEnglandCocinaPlayer />} />
      <Route path="/curso/england/history"          element={<CourseEnglandHistory />} />
      <Route path="/curso/england/history/player"   element={<CourseEnglandHistoryPlayer />} />
      <Route path="/curso/england/mitologia"        element={<CourseEnglandMitologia />} />
      <Route path="/curso/england/mitologia/player" element={<CourseEnglandMitologiaPlayer />} />
    </Routes>
  );
}