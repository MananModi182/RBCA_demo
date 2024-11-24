import { Button, Form, Input, Modal } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "../utiles/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
};

type LoginProps = {
  isVisible: boolean;
  onClose: () => void;
  onSwitch: () => void;
};

const Login: React.FC<LoginProps> = ({ isVisible, onClose, onSwitch }) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(LoginSchema),
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = async ({ email, password }: FormValues) => {
    try {
    } catch (error: unknown) {
      if (error instanceof Error) {
        Error(error.message);
      } else {
        Error(`An unknown error occurred`);
      }
    }
  };

  const handleFormSubmit: SubmitHandler<LoginSchemaType> = async (
    data: FormValues
  ) => {
    setLoading(true);

    if (!data.email || !data.password) {
      Error(`Please enter both email and password`);
      return;
    }

    try {
      await handleSignIn({ email, password });
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
      title="Login"
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
        <div>
          Don't have an account?{" "}
          <Button type="link" onClick={onSwitch}>
            Sign Up
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
