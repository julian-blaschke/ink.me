//credit: https://codepen.io/lhermann/pen/EBGZRZ
import { useContext, useMemo } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDark = useMemo(() => theme === "dark", [theme]);

  return (
    <div className="flex items-center">
      <span
        className="text-sm cursor-pointer"
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        {isDark ? "🌙" : "🌞"}
      </span>
    </div>
  );
};

export default ThemeToggle;
