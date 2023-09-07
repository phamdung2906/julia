/* eslint-disable react/prop-types */
import { useState } from "react";

function DropDownMenu({
  listOptions = [],
  name = "",
  icon,
  type = "",
  onClick,
  disabled,
}) {
  const [selected, setSelected] = useState(name);
  const [dropMenu, setDropMenu] = useState(false);

  function toggleDropDown() {
    if (disabled) return;

    setDropMenu((pre) => !pre);
  }
  return (
    <div className="relative">
      <button
        onClick={toggleDropDown}
        className="flex items-center gap-2 font-normal"
      >
        {name && <span>{selected}</span>}
        {icon}
      </button>
      {dropMenu && (
        <ul className="top-0-full absolute right-0 z-10 w-24 translate-y-2 rounded-md bg-white p-1 font-normal shadow-md">
          {listOptions.map((e, i) => (
            <li
              onClick={function () {
                setDropMenu(!dropMenu);
                if (type === "selection") setSelected(e);
                if (onClick) onClick(e);
              }}
              key={i}
              style={selected === e ? { backgroundColor: "#ccfbf1" } : {}}
              className="grid place-content-center rounded-md py-1 hover:bg-teal-100"
            >
              {e}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropDownMenu;
