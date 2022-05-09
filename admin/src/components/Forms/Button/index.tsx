import React, { ReactChild } from "react";
import { Form, Button } from "antd";
import { ButtonProps } from "antd/lib/button";

type CustomButtonProps = ButtonProps & {
  text: string | ReactChild | JSX.Element;
};

const CustomButton: React.FC<CustomButtonProps> = (
  props: CustomButtonProps
) => {
  return (
    <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
      <Button htmlType="submit" {...props} className="custom-button">
        {props.text}
      </Button>
    </Form.Item>
  );
};

export default CustomButton;
