import { MouseEventHandler } from "react";

type FormButtonProps = {
  message: string;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
export default function FormButton({
  message,
  loading = false,
  onClick,
}: FormButtonProps) {
  return (
    <button
      disabled={loading}
      type="button"
      className="group flex justify-center items-center m-5 p-1 pl-5 pr-5 bg-transparent border-2 border-primarycolor text-primarycolor text-lg rounded-lg transition-colors duration-700 transform hover:bg-primarycolor hover:text-gray-100 focus:border-4 focus:border-primarycolor disabled:cursor-wait"
      onClick={onClick}
    >
      {loading ? (
        <div className="animate-spin rounded-full w-4 h-4 px-2 mr-2 border-b-2 border-primarycolor group-hover:border-white dark:border-white "></div>
      ) : null}
      {message}
    </button>
  );
}
