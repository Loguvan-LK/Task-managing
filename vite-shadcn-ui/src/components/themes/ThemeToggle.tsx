import React from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="absolute top-4 right-4">
      <label
        htmlFor="theme-toggle"
        className="cursor-pointer flex items-center"
      >
        <span className="relative inline-block w-10 h-5 bg-gray-300 rounded-full">
          <span
            className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${
              theme === "dark" ? "translate-x-5" : "translate-x-0"
            }`}
          ></span>
        </span>
        <span className="ml-2 text-sm font-medium">
          {theme === "dark" ? "Dark Mode" : "Light Mode"}
        </span>
      </label>
      <input
        type="checkbox"
        id="theme-toggle"
        checked={theme === "dark"}
        onChange={toggleTheme}
        className="hidden"
      />
    </div>
  );
}
