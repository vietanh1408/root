import React from "react";
import { Form, Input, InputNumber, InputNumberProps } from "antd";
import { Rule } from "antd/lib/form";
import { PasswordProps, TextAreaProps, InputProps } from "antd/lib/input";

type CustomInputProps = InputNumberProps &
  PasswordProps &
  TextAreaProps &
  InputProps & {
    type?: "textarea" | "number" | "password";
    label?: string;
    placeholder?: string;
    name: string;
    rules?: Rule[];
    disabled?: boolean;
    className?: string;
    readonly?: boolean;
  };

const renderInput: React.FC<CustomInputProps> = (props: CustomInputProps) => {
  switch (props.type) {
    case "number":
      return (
        <InputNumber
          width={props.width}
          type="number"
          placeholder={props.placeholder}
          className={props.className}
          readOnly={props.readOnly}
          disabled={props.disabled}
          size={props.size}
          min={props.min}
          max={props.max}
          onChange={props.onChange}
        />
      );

    case "password":
      return (
        <Input.Password
          width={props.width}
          placeholder={props.placeholder}
          className={props.className}
          readOnly={props.readOnly}
          disabled={props.disabled}
          size={props.size}
          prefix={props.prefix}
          suffix={props.suffix}
        />
      );

    case "textarea":
      return (
        <Input.TextArea
          placeholder={props.placeholder}
          className={props.className}
          readOnly={props.readOnly}
          disabled={props.disabled}
          size={props.size}
          rows={props.rows}
          maxLength={props.maxLength}
          showCount={props.showCount}
          style={props.style}
        />
      );

    default:
      return (
        <Input
          width={props.width}
          style={props.style}
          placeholder={props.placeholder}
          className={props.className ?? "custom-input"}
          readOnly={props.readOnly}
          disabled={props.disabled}
          size={props.size}
          prefix={props.prefix}
          suffix={props.suffix}
          onChange={props.onChange}
          onMouseLeave={props.onMouseLeave}
          onBlur={props.onBlur}
        />
      );
  }
};

const CustomInput: React.FC<CustomInputProps> = (props: CustomInputProps) => {
  return (
    <Form.Item label={props.label} name={props.name} rules={props.rules}>
      {renderInput(props)}
    </Form.Item>
  );
};

export default CustomInput;
