import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HistoriaGame from "../components/HistoriaGame";
import "../styles/historia.css";

export default function HistoriaCapitulo() {
  return (
    <div className="historia-page">
      <Navbar />
      <HistoriaGame />
      <Footer />
    </div>
  );
}