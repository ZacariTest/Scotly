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


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/curso/cocina" element={<CourseCocina />} />
      <Route path="/curso/arte" element={<CourseArte />} />
      <Route path="/curso/historia" element={<CourseHistoria />} />
      <Route path="/curso/mitologia" element={<CourseMitologia />} />
      <Route path="/curso/history" element={<CourseHistory />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/invasion" element={<InvasionPage />} />
      <Route path="/sobre-nosotros" element={<SobreNosotros />} />
    </Routes>
  );
}
