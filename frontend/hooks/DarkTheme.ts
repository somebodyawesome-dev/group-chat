import { useEffect, useState } from "react";

const useLocalStorage = (key: string) => {
  const [keyState, setKeyState] = useState<any | null>(null);
  useEffect(() => {
    setKeyState(window.localStorage.getItem(key));
  }, []);
  const setKey = (value: any | null) => {
    if (value === null) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, value);
    }
    setKeyState(value);
  };
  return [keyState, setKey] as const;
};
function getDefaultTheme() {
  const theme = localStorage.getItem("dark-theme");

  return theme ? (JSON.parse(theme) as boolean) : false;
}
const useDarkMode = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(getDefaultTheme());
  }, []);
  useEffect(() => {
    localStorage.setItem("dark-theme", JSON.stringify(enabled));
    const className = "dark";
    const bodyClass = window.document.body.classList;
    enabled === true ? bodyClass.add(className) : bodyClass.remove(className);
  }, [enabled]);

  return [enabled, setEnabled] as const;
};

export default useDarkMode;
