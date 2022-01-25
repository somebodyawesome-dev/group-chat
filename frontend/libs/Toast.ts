import { toast, ToastOptions, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
enum ToasterType {
  "info",
  "success",
  "warning",
  "error",
  "default",
}
const Toaster = (
  type: "info" | "success" | "warning" | "error" | "default",
  message: string,
  darkTheme: boolean = false,
  option?: ToastOptions
) => {
  toast(message, {
    type,
    style: {
      backgroundColor: darkTheme ? "#202225" : "",
      color: darkTheme ? "white" : "",
    },
    ...option,
  });
};
export { Toaster };
