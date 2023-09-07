/* eslint-disable react/prop-types */
import Button from "../../ui/Button";
import Label from "../../ui/Label";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import {
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineArrowSmallRight,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import Spinner from "../../ui/Spinner";
// import { USERNAME, PASSWORD } from "../../Constants/form-constants";
// import { useAuth } from "../../Contexts/AuthProvider";

import { useState } from "react";
// import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  // const { isLoading, errorLogin, login, setErrorLogin, user } = useAuth();
  // const onSubmit = (data) => login(data);
  // // const navigate = useNavigate();
  // useEffect(() => {
  //   if (errorLogin) alert(errorLogin);
  //   if (user) navigate("/");
  //   return () => setErrorLogin("");
  // }, [errorLogin, setErrorLogin, user, navigate]);
  return (
    <>
      <h1 className="mb-10 text-4xl">Welcome to Julia Nailbox</h1>
      <form className="text-base">
        <FormRow>
          <Label name="Username" />
          <Input type="text" />
        </FormRow>
        <FormRow>
          <Label name="Password" />
          <div className="relative">
            <Input type={`${showPassword ? "text" : "password"}`} />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <HiOutlineEye size={20} />
              ) : (
                <HiOutlineEyeSlash size={20} />
              )}
            </span>
          </div>
        </FormRow>

        <Button type="primary" width="full">
          Submit
        </Button>
        <div className="mt-4 flex justify-end">
          <Link to="/signup" className="flex items-center gap-1 underline">
            <span className="text-gray-600"> Đăng ký</span>
            <HiOutlineArrowSmallRight />
          </Link>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
