import { Button, Form, Input, Modal } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "../utiles/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuth } from "../store/authcontext";

type FormValues = {
  email: string;
  password: string;
};

type LoginProps = {
  isVisible: boolean;
  onClose: () => void;
};

const Login: React.FC<LoginProps> = ({ isVisible, onClose }) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const { login } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormSubmit: SubmitHandler<LoginSchemaType> = async (
    data: FormValues
  ) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const loginSuccess = login(data.email, data.password);
      if (loginSuccess) {
        reset();
        onClose();
      } else {
        setErrorMessage("Invalid email or password.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
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
                <Input.Password {...field} placeholder="Enter your password" />
                {fieldState.error && (
                  <span style={{ color: "red" }}>
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        </Form.Item>
        {errorMessage && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {errorMessage}
          </div>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Login;
