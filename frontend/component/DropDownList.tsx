import {
  faArrowDown,
  faArrowUp,
  faDragon,
  faUsers,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler, useState } from "react";
import FormInput from "./FormInput";

type DropDownListProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  setSelection?: (s: string) => void;
  value?: string;
  items?: string[];
  title: string;
  loading?: boolean;
  icon?: IconDefinition;
  filterItems?: boolean;
};

export default function DropDownList({
  title,
  items = [],
  onChange,
  value,
  setSelection,
  loading = false,
  icon = faDragon,
  filterItems = true,
}: DropDownListProps) {
  const [menuEnabled, setMenuEnabled] = useState(false);
  const [filterGroup, setFilterGroup] = useState("");

  const filtredItems = !filterItems
    ? items
    : items
        .filter((value) => {
          return (
            filterGroup === "" ||
            value.toLowerCase().includes(filterGroup.toLowerCase())
          );
        })
        .map((v, index) => {
          return (
            <ListItem
              key={`${v}-${index}`}
              label={v}
              onClick={(ev) => {
                if (setSelection) setSelection(v);
                setMenuEnabled(false);
              }}
            />
          );
        });
  return (
    <div className=" relative w-full">
      <FormInput
        icon={icon}
        placeHolder={title}
        onChange={(ev) => {
          setFilterGroup(ev.target.value);
          if (setSelection) setSelection(ev.target.value);
        }}
        onFocus={() => {
          setMenuEnabled(true);
        }}
        // onBlur={() => {
        //   setMenuEnabled(false);
        // }}
        value={value}
      />

      {/* Items List */}

      {filterItems && (
        <>
          <button
            type="button"
            onClick={() => {
              setMenuEnabled(!menuEnabled);
            }}
            className="absolute right-0 top-1/2 flex transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 py-2 rounded-lg text-primarycolor hover:bg-primarycolor hover:text-white"
          >
            <FontAwesomeIcon
              icon={faArrowDown}
              className={
                "w-5 mx-2 transform transition-all " +
                (menuEnabled ? "rotate-180" : "")
              }
            />
          </button>
          <div
            className={
              (menuEnabled ? "absolute " : "hidden ") +
              `bg-white w-full h-64 overflow-y-scroll scrollbar scrollbar-thumb-primarycolor scrollbar-thin scrollbar-thumb-rounded z-10 box-border pr-4 pb-2 shadow-2xl rounded-b-lg border-b-[1px] border-l-[1px] border-gray-400 dark:border-gray-500  dark:bg-gray-800 dark:text-primarycolor`
            }
          >
            {loading ? (
              <LoadingItems />
            ) : filtredItems.length === 0 ? (
              <EmptyListItem />
            ) : (
              filtredItems
            )}
          </div>
        </>
      )}
    </div>
  );
}
type ListItemProps = {
  label: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};
const ListItem = ({ label, onClick }: ListItemProps) => {
  return (
    <div
      className="text-lg border-l-8 border-transparent p-3 rounded-r-lg transition-all duration-500 text-black  hover:bg-gray-200  hover:border-primarycolor dark:text-white dark:hover:bg-gray-700 dark:hover:text-primarycolor"
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export const LoadingItems = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        style={{ borderTopColor: "transparent" }}
        className="w-16 h-16 border-4  border-primarycolor border-solid rounded-full animate-spin"
      ></div>
    </div>
  );
};

const EmptyListItem = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        style={{ borderTopColor: "transparent" }}
        className="w-full h-16 border-solid rounded-full text-2xl text-gray-500 flex justify-center items-center "
      >
        The demanded data can't be found
      </div>
    </div>
  );
};

const emptyList = [
  <EmptyListItem key={`empty-0`} />,
  // <EmptyListIem key={`empty-1`} />,
  // <EmptyListIem key={`empty-2`} />,
  // <EmptyListIem key={`empty-3`} />,
  // <EmptyListIem key={`empty-4`} />,
  // <EmptyListIem key={`empty-5`} />,
];
