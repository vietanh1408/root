import React from "react";
import { Form, Checkbox } from "antd";
import { CheckboxProps } from "antd/lib/checkbox";

type CustomCheckboxProps = CheckboxProps & {
  name: string;
  text: string;
};

const CustomCheckbox: React.FC<CustomCheckboxProps> = (
  props: CustomCheckboxProps
) => {
  return (
    <Form.Item
      name={props.name}
      valuePropName="checked"
      wrapperCol={{ offset: 8, span: 16 }}
    >
      <Checkbox>{props.text}</Checkbox>
    </Form.Item>
  );
};

export default CustomCheckbox;
