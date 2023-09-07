import NavItem from "./NavItem";

import {
  HiOutlineHome,
  HiOutlineShoppingCart,
  HiOutlineTableCells,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
  HiOutlineArrowsUpDown,
  HiOutlineSquaresPlus,
} from "react-icons/hi2";

function SideBar() {
  return (
    <aside className="col-span-1 row-span-2 h-screen border-r border-teal-100 px-5 py-10">
      <div className="mb-10 text-3xl">
        <img src="src/assets/logo.png" alt="logo" />
      </div>
      <nav>
        <ul className="flex flex-col gap-4 text-xl ">
          <NavItem
            to="home"
            name="Home"
            icon={<HiOutlineHome stroke="inherit" />}
          />
          <NavItem
            to="orders"
            name="Orders"
            icon={<HiOutlineShoppingCart stroke="inherit" />}
          />
          <NavItem
            to="salary"
            name="Salary"
            icon={<HiOutlineTableCells stroke="inherit" />}
          />
          <NavItem
            to="users"
            name="Users"
            icon={<HiOutlineUsers stroke="inherit" />}
          />
          <NavItem
            to="checking"
            name="Checking"
            icon={<HiOutlineArrowsUpDown stroke="inherit" />}
          />
          <NavItem
            to="gallery"
            name="Gallery"
            icon={<HiOutlineSquaresPlus stroke="inherit" />}
          />
          <NavItem
            to="settings"
            name="Settings"
            icon={<HiOutlineCog6Tooth stroke="inherit" />}
          />
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
