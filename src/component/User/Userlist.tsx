import { useContext, useState } from "react";
import { Button, Space, Table, Tag, Typography } from "antd";
import AddEditUser from "./addedituser";
import { UserAddEditSchemaType } from "../../utiles/validation/schema";
import { user_role_listcontext } from "../../store/userliststore";

const { Title } = Typography;

const initialUserData: UserAddEditSchemaType = {
  id: "",
  name: "",
  email: "",
  phoneNumber: "",
  role: "",
  isActive: true,
};

interface AddEditDrawer {
  open: boolean;
  data: UserAddEditSchemaType;
}

const UserList = () => {
  const { userList, handleDeleteUser, handleEditUser, handleAddUser } =
    useContext(user_role_listcontext);

  const [addEditDrawer, setAddEditDrawer] = useState<AddEditDrawer>({
    open: false,
    data: initialUserData,
  });

  const closeAddEditDrawer = () => {
    setAddEditDrawer({ open: false, data: initialUserData });
  };

  const handleSubmit = (values: UserAddEditSchemaType) => {
    if (values.id) {
      handleEditUser(values);
    } else {
      const newUser = { ...values, id: String(Date.now()) };
      handleAddUser(newUser);
    }
    closeAddEditDrawer();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text: string) => <Tag>{text}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => setAddEditDrawer({ open: true, data: record })}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDeleteUser(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ width: "100%", padding: "30px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title level={3}>User List</Title>
        <Button
          type="primary"
          onClick={() =>
            setAddEditDrawer({ open: true, data: initialUserData })
          }
        >
          Add User
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={userList}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        style={{ marginTop: "20px" }}
      />
      <AddEditUser
        open={addEditDrawer.open}
        onClose={closeAddEditDrawer}
        defaultValues={addEditDrawer.data}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UserList;
