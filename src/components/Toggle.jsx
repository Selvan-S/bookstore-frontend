import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export const DarkModeToggle = ({ darkMode }) => {
  const [isDark, setIsDark] = useState(null);
  const [isChecked, setIsChecked] = useState(true);

  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined,
    (isSystemDark) => {
      setIsDark(isSystemDark);
      setIsChecked(isSystemDark);
    }
  );
  useEffect(() => {
    if (isDark === null) {
      if (systemPrefersDark) {
        document.body.classList.add("dark");
        setIsChecked(true);
      } else {
        document.body.classList.remove("dark");
        setIsChecked(false);
      }
      darkMode(systemPrefersDark);
    } else {
      if (isDark) {
        document.body.classList.add("dark");
        setIsChecked(true);
      } else {
        document.body.classList.remove("dark");
        setIsChecked(false);
      }
      darkMode(isDark);
    }
  }, [isDark]);

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onChange={({ target }) => setIsDark(target.checked)}
        checked={isChecked}
      />
      <div
        className={`${
          isDark
            ? "border-gray-600 bg-gray-700 peer-focus:ring-blue-800"
            : "bg-gray-200 peer-focus:ring-blue-300"
        } w-11 h-6 mt-1 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
      ></div>
      {/* <span
        className={`${
          isDark ? "text-gray-300" : "text-gray-900"
        } ms-3 text-sm font-medium `}
      >
        Dark
      </span> */}
    </label>
  );
};
