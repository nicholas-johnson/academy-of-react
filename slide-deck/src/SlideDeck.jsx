import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import {
  TitleSlide,
  StandardSlide,
  ComparisonSlide,
  CodeSlide,
  RulesSlide,
  WelcomeSlide,
  ModulesSlide,
} from "./components";

function SlideViewer({ slides }) {
  const { slideNumber } = useParams();
  const navigate = useNavigate();

  // Convert to 0-based index, default to slide 1
  const currentSlide = Math.max(
    0,
    Math.min(parseInt(slideNumber || "1", 10) - 1, slides.length - 1),
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (currentSlide < slides.length - 1) {
          navigate(`/${currentSlide + 2}`);
        }
      } else if (e.key === "ArrowLeft" || e.key === "Backspace") {
        e.preventDefault();
        if (currentSlide > 0) {
          navigate(`/${currentSlide}`);
        }
      } else if (e.key === "Home") {
        navigate("/1");
      } else if (e.key === "End") {
        navigate(`/${slides.length}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, navigate, slides.length]);

  const slide = slides[currentSlide];

  const renderSlide = () => {
    switch (slide.type) {
      case "title":
        return <TitleSlide content={slide.content} />;
      case "comparison":
        return <ComparisonSlide content={slide.content} />;
      case "code":
        return <CodeSlide content={slide.content} />;
      case "rules":
        return <RulesSlide content={slide.content} />;
      case "welcome":
        return <WelcomeSlide content={slide.content} />;
      case "modules":
        return <ModulesSlide content={slide.content} />;
      default:
        return <StandardSlide content={slide.content} />;
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {renderSlide()}

      <div className="flex justify-center items-center gap-8 p-4 bg-slate-950 border-t border-slate-800">
        <button
          onClick={() => navigate(`/${currentSlide}`)}
          disabled={currentSlide === 0}
          className="px-6 py-2 font-semibold rounded-lg bg-gradient-to-r from-primary to-secondary text-white transition-all hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          ← Prev
        </button>
        <span className="text-lg text-gray-400 font-semibold min-w-[80px] text-center">
          {currentSlide + 1} / {slides.length}
        </span>
        <button
          onClick={() => navigate(`/${currentSlide + 2}`)}
          disabled={currentSlide === slides.length - 1}
          className="px-6 py-2 font-semibold rounded-lg bg-gradient-to-r from-primary to-secondary text-white transition-all hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Next →
        </button>
      </div>

      <div className="text-center py-2 text-sm text-slate-600 bg-slate-950">
        Use ← → arrow keys or click buttons to navigate
      </div>
    </div>
  );
}

export function SlideDeck({ slides }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:slideNumber" element={<SlideViewer slides={slides} />} />
        <Route path="/" element={<Navigate to="/1" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
