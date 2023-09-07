import Label from "../../ui/Label";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

import { Link } from "react-router-dom";
function SignUpForm() {
  return (
    <>
      <h1 className="mb-10 text-4xl">Đăng ký tài khoản</h1>
      <form>
        <FormRow>
          <Label name="Tên doanh nghiệp" />
          <Input type="text" />
        </FormRow>
        <FormRow>
          <Label name="Tên đăng nhập" />
          <Input type="text" />
        </FormRow>
        <FormRow>
          <Label name="Mật khẩu" />
          <Input type="password" />
        </FormRow>
        <FormRow>
          <Label name="Xác nhận mật khẩu" />
          <Input type="password" />
        </FormRow>
        <div className="mt-10">
          <Button type="primary" width="full" disableBtn={true}>
            Đăng ký
          </Button>
        </div>
        <Link to="/login" className="mt-4 block">
          <Button type="secondary" width="full">
            Đã có tài khoản?
          </Button>
        </Link>
      </form>
    </>
  );
}

export default SignUpForm;
