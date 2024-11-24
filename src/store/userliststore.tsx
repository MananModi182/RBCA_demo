import { createContext, useReducer, ReactNode } from "react";
import {
  UserAddEditSchemaType,
  RoleAddEditSchemaType,
} from "../utiles/validation/schema";

interface User_Role_ListContextProps {
  userList: UserAddEditSchemaType[];
  handleDeleteUser: (id: string) => void;
  handleEditUser: (user: UserAddEditSchemaType) => void;
  handleAddUser: (user: Omit<UserAddEditSchemaType, "id">) => void;
  roleList: RoleAddEditSchemaType[];
  handleDeleteRole: (id: string) => void;
  handleEditRole: (role: RoleAddEditSchemaType) => void;
  handleAddRole: (role: Omit<RoleAddEditSchemaType, "id">) => void;
}

export const user_role_listcontext = createContext<User_Role_ListContextProps>({
  userList: [],
  handleDeleteUser: () => {},
  handleEditUser: () => {},
  handleAddUser: () => {},
  roleList: [],
  handleDeleteRole: () => {},
  handleEditRole: () => {},
  handleAddRole: () => {},
});

const initialState = {
  userList: [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "+1234567890",
      role: "Admin",
      isActive: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phoneNumber: "+0987654321",
      role: "Editor",
      isActive: false,
    },
  ] as UserAddEditSchemaType[],
  roleList: [
    {
      id: "1",
      name: "Admin",
      permissions: ["Create", "Read", "Update", "Delete"],
    },
    { id: "2", name: "Editor", permissions: ["Read", "Update"] },
    { id: "3", name: "Viewer", permissions: ["Read"] },
  ] as RoleAddEditSchemaType[],
};

type Action =
  | { type: "ADD_USER"; payload: UserAddEditSchemaType }
  | { type: "DELETE_USER"; payload: string }
  | { type: "EDIT_USER"; payload: UserAddEditSchemaType }
  | { type: "ADD_ROLE"; payload: RoleAddEditSchemaType }
  | { type: "DELETE_ROLE"; payload: string }
  | { type: "EDIT_ROLE"; payload: RoleAddEditSchemaType };

const userRoleListReducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, userList: [...state.userList, action.payload] };
    case "DELETE_USER":
      return {
        ...state,
        userList: state.userList.filter((user) => user.id !== action.payload),
      };
    case "EDIT_USER":
      return {
        ...state,
        userList: state.userList.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case "ADD_ROLE":
      return { ...state, roleList: [...state.roleList, action.payload] };
    case "DELETE_ROLE":
      return {
        ...state,
        roleList: state.roleList.filter((role) => role.id !== action.payload),
      };
    case "EDIT_ROLE":
      return {
        ...state,
        roleList: state.roleList.map((role) =>
          role.id === action.payload.id ? action.payload : role
        ),
      };
    default:
      return state;
  }
};

interface UserRoleListProviderProps {
  children: ReactNode;
}

export const UserRoleListProvider = ({
  children,
}: UserRoleListProviderProps) => {
  const [state, dispatch] = useReducer(userRoleListReducer, initialState);

  const handleAddUser = (user: Omit<UserAddEditSchemaType, "id">) => {
    dispatch({
      type: "ADD_USER",
      payload: { ...user, id: String(Date.now()) },
    });
  };

  const handleDeleteUser = (id: string) => {
    dispatch({ type: "DELETE_USER", payload: id });
  };

  const handleEditUser = (user: UserAddEditSchemaType) => {
    dispatch({ type: "EDIT_USER", payload: user });
  };

  // Role handlers
  const handleAddRole = (role: Omit<RoleAddEditSchemaType, "id">) => {
    dispatch({
      type: "ADD_ROLE",
      payload: { ...role, id: String(Date.now()) },
    });
  };

  const handleDeleteRole = (id: string) => {
    dispatch({ type: "DELETE_ROLE", payload: id });
  };

  const handleEditRole = (role: RoleAddEditSchemaType) => {
    dispatch({ type: "EDIT_ROLE", payload: role });
  };

  return (
    <user_role_listcontext.Provider
      value={{
        userList: state.userList,
        handleDeleteUser,
        handleEditUser,
        handleAddUser,
        roleList: state.roleList,
        handleDeleteRole,
        handleEditRole,
        handleAddRole,
      }}
    >
      {children}
    </user_role_listcontext.Provider>
  );
};
