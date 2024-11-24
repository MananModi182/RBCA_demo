import { useContext, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Checkbox,
  message,
  Typography,
} from "antd";
import { user_role_listcontext } from "../../store/userliststore";
import { RoleAddEditSchemaType } from "../../utiles/validation/schema";

const { Title } = Typography;

const RoleList = () => {
  const { roleList, handleAddRole, handleDeleteRole, handleEditRole } =
    useContext(user_role_listcontext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<RoleAddEditSchemaType | null>(
    null
  );
  const [form] = Form.useForm();

  const handleSubmit = (values: Omit<RoleAddEditSchemaType, "id">) => {
    if (editingRole) {
      handleEditRole({ ...editingRole, ...values });
      message.success("Role updated successfully.");
    } else {
      handleAddRole(values);
      message.success("Role added successfully.");
    }
    setIsModalOpen(false);
    setEditingRole(null);
    form.resetFields();
  };

  const openModalForEdit = (role: RoleAddEditSchemaType) => {
    setEditingRole(role);
    form.setFieldsValue(role);
    setIsModalOpen(true);
  };

  const openModalForAdd = () => {
    setEditingRole(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      render: (permissions: string[]) => permissions.join(", "),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, role: RoleAddEditSchemaType) => (
        <>
          <Button type="link" onClick={() => openModalForEdit(role)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDeleteRole(role.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title level={3}>Role List</Title>
        <Button type="primary" onClick={openModalForAdd} className="mb-3">
          Add Role
        </Button>
      </div>
      <Table
        dataSource={roleList}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title={editingRole ? "Edit Role" : "Add Role"}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ permissions: [] }}
        >
          <Form.Item
            name="name"
            label="Role Name"
            rules={[{ required: true, message: "Please enter a role name" }]}
          >
            <Input placeholder="Enter role name" />
          </Form.Item>
          <Form.Item
            name="permissions"
            label="Permissions"
            rules={[
              {
                required: true,
                message: "Please select at least one permission",
              },
            ]}
          >
            <Checkbox.Group>
              <Checkbox value="Create">Create</Checkbox>
              <Checkbox value="Read">Read</Checkbox>
              <Checkbox value="Update">Update</Checkbox>
              <Checkbox value="Delete">Delete</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoleList;
