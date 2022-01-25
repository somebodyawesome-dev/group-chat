import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React, { KeyboardEventHandler } from "react";
type FormInputProps = {
  placeHolder: string;
  value?: string;
  icon: IconDefinition;
  color?: string;
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyUp?: KeyboardEventHandler<HTMLInputElement>;
  style?: React.CSSProperties;
  tailewindStyle?: string;
  useDarkTheme?: boolean;
  inverseOrder?: boolean;
  noIcon?: boolean;
};
export default function FormInput({
  placeHolder,
  icon,
  color,
  type,
  onChange,
  style,
  tailewindStyle,
  onFocus,
  onBlur,
  value,
  useDarkTheme = true,
  inverseOrder = false,
  noIcon = false,
  onKeyUp,
}: FormInputProps) {
  const iconColor = color ? color : "text-primarycolor";
  const iconElement = !noIcon && (
    <FontAwesomeIcon
      icon={icon}
      className={`${iconColor} w-5  mx-3 hover:bg-white `}
    />
  );
  const inputElement = (
    <input
      className={`outline-none bg-transparent placeholder-gray-500  flex-grow ${
        useDarkTheme ? "dark:placeholder-white dark:text-primarycolor" : ""
      }`}
      autoComplete="off"
      type={type ? type : "text"}
      placeholder={placeHolder}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      onKeyUp={onKeyUp}
    />
  );
  return (
    <div
      style={style}
      className={
        "flex border-b-2 text-xl border-gray-400 focus-within:border-primarycolor transition-all duration-500 transform m-2 flex-grow p-2"
      }
    >
      {!inverseOrder ? (
        <>
          {iconElement}
          {inputElement}
        </>
      ) : (
        <>
          {inputElement}
          {iconElement}
        </>
      )}
    </div>
  );
}
