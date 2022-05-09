import React from "react";
import { Form, Input, Checkbox, Button } from "antd";
import CustomInput from "./Input";
import CustomCheckbox from "./Checkbox";
import CustomButton from "./Button";

const CustomForm: React.FC = () => {
  const onFinish = (value: any) => {
    console.log("value: ", value);
  };

  const onFinishFailed = (value: any) => {
    console.log("value: ", value);
  };

  return (
    <div className="container">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <CustomInput name="name" label="Name" />

        <CustomInput name="password" label="Password" type="password" />

        <CustomCheckbox name="remember" text="Remember me" />

        <CustomButton text="Start Now" />
      </Form>
    </div>
  );
};

export default CustomForm;
