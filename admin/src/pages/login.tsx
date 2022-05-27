import CustomButton from "@/components/Forms/Button";
import CustomCheckbox from "@/components/Forms/Checkbox";
import CustomInput from "@/components/Forms/Input";
import { Form, notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import message from "src/constants/message";
import { AuthAction, fetchLogin } from "src/redux/actions/auth";
import { RootState } from "src/redux/reducers";

export interface LoginInput {
  username: string;
  password: string;
  remember: boolean;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const { loading } = useSelector((state: RootState) => state.auth);

  const onFinish = async (value: LoginInput) => {
    dispatch({ type: AuthAction.LOGGING_IN });

    const response = await fetchLogin(value);

    if (response && response.success) {
      notification.success({
        message: message.loginSuccess,
      });
      dispatch({ type: AuthAction.LOGIN_SUCCESS, payload: response });
      router.push("/");
    } else {
      notification.error({
        message: response.message,
      });
      dispatch({ type: AuthAction.LOGIN_FAIL });
    }
  };

  const onFinishFailed = (value: any) => {
    console.log("value failed: ", value);
  };

  return (
    <div className="login-wrapper">
      <div className="container py-3">
        <h1 className="text-center">ADMINISTRATOR</h1>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <CustomInput
            name="username"
            label="Name"
            size="large"
            rules={[
              {
                required: true,
                message: "Name is required",
              },
            ]}
          />

          <CustomInput
            name="password"
            label="Password"
            type="password"
            size="large"
            rules={[
              {
                required: true,
                message: "Password is required",
              },
            ]}
          />
          <CustomCheckbox name="remember" text="Remember me" />

          <CustomButton text="Login" block loading={loading} />

          <div className="w-100 d-flex justify-content-center align-items-center">
            <Link href={"/register"}>Register</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
