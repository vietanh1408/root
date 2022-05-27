import CustomButton from "@/components/Forms/Button";
import CustomInput from "@/components/Forms/Input";
import { Form, notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import message from "src/constants/message";
import { AuthAction, fetchRegister } from "src/redux/actions/auth";
import { RootState } from "src/redux/reducers";

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const { loading } = useSelector((state: RootState) => state.auth);

  const onFinish = async (value: RegisterInput) => {
    dispatch({ type: AuthAction.REGISTERING });

    const response = await fetchRegister(value);

    if (response && response.success) {
      notification.success({
        message: message.registerSuccess,
      });
      dispatch({ type: AuthAction.REGISTER_SUCCESS, payload: response });
      router.push("/");
    } else {
      notification.error({
        message: response.message,
      });
      dispatch({ type: AuthAction.REGISTER_FAIL });
    }
  };

  const onFinishFailed = (value: any) => {
    console.log("value failed: ", value);
  };

  return (
    <div className="register-wrapper">
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
            name="email"
            label="E-mail"
            size="large"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail",
              },
              {
                required: true,
                message: "E-mail is required",
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

          <CustomInput
            name="confirm-password"
            label="Confirm password"
            type="password"
            size="large"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Confirm password is required",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          />

          <CustomButton text="Register" block loading={loading} />

          <div className="w-100 d-flex justify-content-center align-items-center">
            <Link href={"/login"}>Login</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
