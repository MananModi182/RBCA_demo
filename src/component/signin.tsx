import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SigninSchema, SigninSchematype } from "../utiles/validation/schema";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

type SigninProps = {
  isVisible: boolean;
  onClose: () => void;
  onSwitch: () => void;
};

const Signin: React.FC<SigninProps> = ({ isVisible, onClose, onSwitch }) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(SigninSchema),
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleFormSubmit: SubmitHandler<SigninSchematype> = async (
    data: FormValues
  ) => {
    setLoading(true);
    console.log(data);
    if (!data.email || !data.password) {
      Error(`Please enter both email and password`);
      return;
    }

    try {
      // await handleSignIn({ email, password });
    } catch (err) {
      Error(`Invalid login credentials`, err);
    }
    setLoading(false);
  };

  return (
    <Modal
      visible={isVisible}
      onCancel={onClose}
      centered
      footer={null}
      title="Create Account"
    >
      <div
        style={{
          position: "relative",
          left: "50%",
          transform: "translatex(-50%)",
        }}
      >
        <Form onFinish={handleSubmit(handleFormSubmit)} layout={"vertical"}>
          <Form.Item label="Email">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Input {...field} placeholder="Enter your Email" />
                  {fieldState.error && (
                    <span style={{ color: "red" }}>
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </Form.Item>
          <Form.Item label="Password">
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Input.Password
                    {...field}
                    placeholder="Enter your password"
                  />
                  {fieldState.error && (
                    <span style={{ color: "red" }}>
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </Form.Item>
          <Form.Item label="Confirm Password">
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Input.Password
                    {...field}
                    placeholder="Confirm your password"
                  />
                  {fieldState.error && (
                    <span style={{ color: "red" }}>
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default Signin;
