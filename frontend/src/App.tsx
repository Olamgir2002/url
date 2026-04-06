import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import { LoginModal } from "./components/LoginModal";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { API_BASE_URL } from "./api/baseClient";

const THEME_STORAGE_KEY = "theme";

function App() {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem(THEME_STORAGE_KEY) === "dark",
  );
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; username?: string } | null>(
    null,
  );

  useEffect(() => {
    fetch(`${API_BASE_URL}/login/me`, { credentials: "include", method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn) {
          setUser(data.user);
        }
      });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#f3f4f8] text-slate-900 transition-colors duration-300 dark:bg-[#0d1020] dark:text-slate-100">
      <div className="soft-glow soft-glow-left pointer-events-none" />
      <div className="soft-glow soft-glow-right pointer-events-none" />

      <Navbar
        isDark={isDark}
        setIsDark={setIsDark}
        setIsSignInOpen={setIsSignInOpen}
        user={user}
        setUser={setUser}
      />

      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/profile" element={<ProfilePage user={user} />} />
      </Routes>

      <footer className="relative z-10 border-t border-slate-200/70 py-7 text-center dark:border-white/10">
        <p className="text-lg text-indigo-950/55 dark:text-indigo-100/55">
          © 2026 Shorten. Built with precision.
        </p>
      </footer>

      {isSignInOpen && (
        <LoginModal setIsSignInOpen={setIsSignInOpen} setUser={setUser} />
      )}

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
