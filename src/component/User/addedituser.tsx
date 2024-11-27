import React, { useContext, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Form, Space, Drawer, Select } from "antd";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import {
  UserAddEditSchema,
  UserAddEditSchemaType,
} from "../../utiles/validation/schema";
import { user_role_listcontext } from "../../store/userliststore";

interface AddEditUserProps {
  open: boolean;
  onClose: () => void;
  defaultValues: UserAddEditSchemaType;
  onSubmit: (data: UserAddEditSchemaType) => void;
}
const AddEditUser: React.FC<AddEditUserProps> = ({
  open,
  onClose,
  defaultValues,
  onSubmit,
}) => {
  const { handleSubmit, control, reset } = useForm<UserAddEditSchemaType>({
    defaultValues,
    resolver: zodResolver(UserAddEditSchema),
  });

  const { getCombinedRoles } = useContext(user_role_listcontext);

  const roleList = getCombinedRoles();

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleFormSubmit: SubmitHandler<UserAddEditSchemaType> = (data) => {
    console.log(data);
    onSubmit(data);
    onClose();
    // reset();
  };

  return (
    <Drawer
      title={`${defaultValues?.id ? "Edit" : "Add"} details`}
      open={open}
      onClose={onClose}
    >
      <Form onFinish={handleSubmit(handleFormSubmit)} layout="vertical">
        <Form.Item label="Name">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} />
                {fieldState.error && (
                  <p style={{ color: "red" }}>{fieldState.error.message}</p>
                )}
              </>
            )}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} disabled={Boolean(defaultValues?.id)} />
                {fieldState.error && (
                  <p style={{ color: "red" }}>{fieldState.error.message}</p>
                )}
              </>
            )}
          />
        </Form.Item>

        <Form.Item label="Phone Number">
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Input
                  {...field}
                  className="placeholder-secondary-800 font-normal"
                />
                {fieldState.error && (
                  <p style={{ color: "red" }}>{fieldState.error.message}</p>
                )}
              </>
            )}
          />
        </Form.Item>
        <Form.Item label="Select Role">
          <Controller
            name="role"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Select
                  {...field}
                  options={roleList.map((role) => ({
                    label: role.name,
                    value: role.name,
                  }))}
                />
                {fieldState.error && (
                  <p style={{ color: "red" }}>{fieldState.error.message}</p>
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
                <Input
                  {...field}
                  className="placeholder-secondary-800 font-normal"
                />
                {fieldState.error && (
                  <p style={{ color: "red" }}>{fieldState.error.message}</p>
                )}
              </>
            )}
          />
        </Form.Item>

        <Form.Item className="right-5 !pt-1">
          <Space size="large" className="flex flex-row-reverse !mt-0 !pt-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button
              type="primary"
              onClick={() => {
                "button click";
              }}
              htmlType="submit"
            >
              {defaultValues?.id ? "Edit" : "Create"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddEditUser;
