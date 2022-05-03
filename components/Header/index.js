import gstyles from "../../gstyles/index";
import { useTheme } from "next-themes";
import React from "react";

const Header = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { systemTheme, theme, setTheme } = useTheme();

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <div
          className="w-10 h-10 text-yellow-500 "
          onClick={() => setTheme("light")}
        >
          Sun
        </div>
      );
    } else {
      return (
        <div
          className="w-10 h-10 text-gray-900"
          onClick={() => setTheme("dark")}
        >
          Moon
        </div>
      );
    }
  };

  return (
    <header className="h-15 dark:border-gray-700">
      <div className="container py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          
            {gstyles.icons({
              name: "github",
              size: 24,
              fill: "red",
            })}
          
          
            {gstyles.icons({
              name: "twitter",
              size: 24,
              fill: "red",
            })}
          
        </div>
        {renderThemeChanger()}
      </div>
    </header>
  );
};

export default Header;
