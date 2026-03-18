"use client";
import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("mode");
    if (saved && saved !== mode) {
      setMode(saved);
    }
  },[]);

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const toggle = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      <div className={`theme ${mode} min-h-screen flex flex-col`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default function useTheme() {
  return useContext(ThemeContext);
}
