import { createContext, useEffect, useState } from "react";

interface ThemeContextType {
  ThemeList: any;
  Theme: any;
  SetTheme: React.Dispatch<React.SetStateAction<any>>;
  SetNewTheme: any;
}

export const ThemeContext = createContext<ThemeContextType>({
  ThemeList: [],
  Theme: [],
  SetTheme: () => {},
  SetNewTheme: () => {},
});

export default function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [Theme, SetTheme] = useState<any>([]);
  const ThemeList = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];
  const theme = localStorage.getItem("theme");
  useEffect(() => {
    SetTheme(theme);
  }, [theme]);

  const SetNewTheme = (theme_name: string) => {
    localStorage.setItem("theme", theme_name);
    SetTheme(theme_name);
  };

  return (
    <ThemeContext.Provider value={{ ThemeList, Theme, SetTheme, SetNewTheme }}>
      <div data-theme={Theme}>{children}</div>
    </ThemeContext.Provider>
  );
}
