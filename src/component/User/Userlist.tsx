import { useContext, useState } from "react";
import { Button, Space, Table, Tag, Typography } from "antd";
import AddEditUser from "./addedituser";
import { UserAddEditSchemaType } from "../../utiles/validation/schema";
import { user_role_listcontext } from "../../store/userliststore";
import { useAuth } from "../../store/authcontext";

const { Title } = Typography;

const initialUserData: UserAddEditSchemaType = {
  id: "",
  name: "",
  email: "",
  phoneNumber: "",
  role: "",
  password: "",
  isActive: true,
};

interface AddEditDrawer {
  open: boolean;
  data: UserAddEditSchemaType;
}

const UserList = () => {
  const {
    getCombinedUsers,
    handleDeleteUser,
    handleEditUser,
    handleAddUser,
    validateUserPermission,
  } = useContext(user_role_listcontext);

  const userdata = getCombinedUsers();

  const [addEditDrawer, setAddEditDrawer] = useState<AddEditDrawer>({
    open: false,
    data: initialUserData,
  });

  const { isLoggedIn, currentUser } = useAuth();

  const closeAddEditDrawer = () => {
    setAddEditDrawer({ open: false, data: initialUserData });
  };

  const handleSubmit = (values: UserAddEditSchemaType) => {
    let newvalue;
    if (values.id) {
      handleEditUser(values);
    } else {
      newvalue = { ...values, id: String(Date.now()) };
      handleAddUser(newvalue);
    }
    localStorage.setItem("userAddEditSchema", JSON.stringify(newvalue));
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
      render: (_: unknown, user: UserAddEditSchemaType) => {
        const canEdit = validateUserPermission(currentUser?.role, "Update");
        const canDelete = validateUserPermission(currentUser?.role, "Delete");
        return (
          <Space>
            <Button
              type="link"
              onClick={() => setAddEditDrawer({ open: true, data: user })}
              disabled={!canEdit}
            >
              Edit
            </Button>
            <Button
              type="link"
              danger
              onClick={() => handleDeleteUser(record.id)}
              disabled={!canDelete}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="container mt-4">
      {isLoggedIn ? (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title level={3}>User List</Title>

            <Button
              type="primary"
              onClick={() =>
                setAddEditDrawer({ open: true, data: initialUserData })
              }
              disabled={!validateUserPermission(currentUser?.role, "Create")}
            >
              Add User
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={userdata}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            style={{ marginTop: "20px", width: "100%" }}
            scroll={{ x: "max-content" }}
          />
        </>
      ) : (
        <p>Please Login to see the User list.</p>
      )}
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
