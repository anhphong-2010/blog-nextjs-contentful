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
        <div className="cursor-pointer" onClick={() => setTheme("light")}>
          {gstyles.icons({
            name: "star",
            size: 24,
            fill: "#ffffff",
          })}
        </div>
      );
    } else {
      return (
        <div className="cursor-pointer" onClick={() => setTheme("dark")}>
          {gstyles.icons({
            name: "star",
            size: 24,
            fill: "#000000",
          })}
        </div>
      );
    }
  };

  return (
    <header className="h-15 dark:border-gray-700">
      <div className="container py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div>
            {gstyles.icons({
              name: "github",
              size: 24,
              fill: theme === "dark" ? "#ffffff" : "#000000",
            })}
          </div>
          <div>
            {gstyles.icons({
              name: "twitter",
              size: 24,
              fill: theme === "dark" ? "#ffffff" : "#000000",
            })}
          </div>
        </div>
        {renderThemeChanger()}
      </div>
    </header>
  );
};

export default Header;
