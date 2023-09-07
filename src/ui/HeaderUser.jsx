import { HiOutlineUser, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import Button from "./Button";
import Avatar from "./Avatar";
import { useAuth } from "../Contexts/AuthProvider";
function HeaderUser() {
  const { logout } = useAuth();
  return (
    <div className="flex flex-row-reverse items-center border-b px-10 py-5">
      <div className="flex items-center gap-4">
        <Avatar />
        <p className="text-lg font-medium">Jeff pham</p>
        <span>
          <HiOutlineUser size={24} />
        </span>
        <Button
          onClick={() => logout()}
          icon={<HiOutlineArrowRightOnRectangle size={24} />}
          type="secondary"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default HeaderUser;
