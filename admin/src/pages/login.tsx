import CustomButton from "@/components/Forms/Button";
import CustomCheckbox from "@/components/Forms/Checkbox";
import CustomInput from "@/components/Forms/Input";
import { Form } from "antd";
import Link from "next/link";
import React from "react";

const login: React.FC = () => {
  const onFinish = (value: any) => {
    console.log("value: ", value);
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
            name="name"
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

          <CustomButton text="Login" block />

          <div className="w-100 d-flex justify-content-center align-items-center">
            <Link href={"/register"}>Register</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default login;
