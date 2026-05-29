import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import "./App.css";

type Page = "home" | "users" | "settings";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const renderPage = () => {
    switch (currentPage) {
      case "home": return <Home darkMode={darkMode} />;
      case "users": return <Users darkMode={darkMode} />;
      case "settings": return <Settings darkMode={darkMode} setDarkMode={setDarkMode} />;
      default: return <Home darkMode={darkMode} />;
    }
  };

  return (
    <div
      className={`flex min-h-screen flex-col md:flex-row ${
        darkMode
          ? "bg-gradient-to-br from-[#0b1118] via-[#0f172a] to-[#0b1118] text-slate-100"
          : "bg-gradient-to-br from-stone-50 via-amber-50 to-emerald-50 text-slate-900"
      }`}
    >
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} darkMode={darkMode} />
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 md:py-7 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;