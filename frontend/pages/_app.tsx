import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../component/AuthProvider";

import { CookiesProvider } from "react-cookie";
import "font-awesome/css/font-awesome.min.css";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  // const [darkTheme, setDarkThem] = useDarkMode();

  return (
    <CookiesProvider>
      <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </AuthProvider>
    </CookiesProvider>
  );
}

export default MyApp;
