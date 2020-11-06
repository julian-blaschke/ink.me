//credit: https://codepen.io/lhermann/pen/EBGZRZ
import { useContext, useMemo } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDark = useMemo(() => theme === "dark", [theme]);

  return (
    <div className="flex items-center">
      <label htmlFor="toogleA" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="toogleA"
            type="checkbox"
            className="hidden"
            checked={isDark}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          />
          <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
        </div>
        <div className="ml-3 text-xs">Dark Mode 🌙 </div>
      </label>
    </div>
  );
};

export default ThemeToggle;
