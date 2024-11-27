import React, { createContext, useReducer, ReactNode, useEffect } from "react";
import { dummyUsers, roles } from "../data";

interface Permission {
  Create: boolean;
  Read: boolean;
  Update: boolean;
  Delete: boolean;
}

export interface UserAddEditSchemaType {
  id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  isActive: boolean;
}

export interface RoleAddEditSchemaType {
  id: string;
  name: string;
  permissions: string[];
}

interface User_Role_ListContextProps {
  userList: UserAddEditSchemaType[];
  roleList: RoleAddEditSchemaType[];
  handleAddUser: (user: Omit<UserAddEditSchemaType, "id">) => void;
  handleEditUser: (user: UserAddEditSchemaType) => void;
  handleDeleteUser: (id: string) => void;
  handleAddRole: (role: Omit<RoleAddEditSchemaType, "id">) => void;
  handleEditRole: (role: RoleAddEditSchemaType) => void;
  handleDeleteRole: (id: string) => void;
  getCombinedUsers: () => UserAddEditSchemaType[];
  getCombinedRoles: () => RoleAddEditSchemaType[];
  validateUserPermission: (roleName: string, permission: string) => boolean;
}

export const user_role_listcontext = createContext<User_Role_ListContextProps>({
  userList: [],
  roleList: [],
  handleAddUser: () => {},
  handleEditUser: () => {},
  handleDeleteUser: () => {},
  handleAddRole: () => {},
  handleEditRole: () => {},
  handleDeleteRole: () => {},
  getCombinedUsers: () => [],
  getCombinedRoles: () => [],
  validateUserPermission: () => false,
});

const initialState = {
  userList: JSON.parse(localStorage.getItem("userList") || "null") || [],
  roleList: JSON.parse(localStorage.getItem("roleList") || "null") || [],
};

type Action =
  | { type: "ADD_USER"; payload: UserAddEditSchemaType }
  | { type: "EDIT_USER"; payload: UserAddEditSchemaType }
  | { type: "DELETE_USER"; payload: string }
  | { type: "ADD_ROLE"; payload: RoleAddEditSchemaType }
  | { type: "EDIT_ROLE"; payload: RoleAddEditSchemaType }
  | { type: "DELETE_ROLE"; payload: string };

const userRoleListReducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, userList: [...state.userList, action.payload] };
    case "EDIT_USER":
      return {
        ...state,
        userList: state.userList.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case "DELETE_USER":
      return {
        ...state,
        userList: state.userList.filter((user) => user.id !== action.payload),
      };
    case "ADD_ROLE":
      return { ...state, roleList: [...state.roleList, action.payload] };
    case "EDIT_ROLE":
      return {
        ...state,
        roleList: state.roleList.map((role) =>
          role.id === action.payload.id ? action.payload : role
        ),
      };
    case "DELETE_ROLE":
      return {
        ...state,
        roleList: state.roleList.filter((role) => role.id !== action.payload),
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

  useEffect(() => {
    localStorage.setItem("userList", JSON.stringify(state.userList));
  }, [state.userList]);

  useEffect(() => {
    localStorage.setItem("roleList", JSON.stringify(state.roleList));
  }, [state.roleList]);

  const handleAddUser = (user: Omit<UserAddEditSchemaType, "id">) => {
    dispatch({
      type: "ADD_USER",
      payload: { ...user, id: String(Date.now()) },
    });
  };

  const handleEditUser = (user: UserAddEditSchemaType) => {
    dispatch({ type: "EDIT_USER", payload: user });
  };

  const handleDeleteUser = (id: string) => {
    dispatch({ type: "DELETE_USER", payload: id });
  };

  const handleAddRole = (role: Omit<RoleAddEditSchemaType, "id">) => {
    dispatch({
      type: "ADD_ROLE",
      payload: { ...role, id: String(Date.now()) },
    });
  };

  const handleEditRole = (role: RoleAddEditSchemaType) => {
    dispatch({ type: "EDIT_ROLE", payload: role });
  };

  const handleDeleteRole = (id: string) => {
    dispatch({ type: "DELETE_ROLE", payload: id });
  };

  const getCombinedUsers = () => {
    return [...dummyUsers, ...state.userList];
  };

  const getCombinedRoles = () => {
    return [...roles, ...state.roleList];
  };

  const validateUserPermission = (roleName: string, permission: string) => {
    const combinedRoles = getCombinedRoles();
    const role = combinedRoles.find((r) => r.name === roleName);
    return role ? role.permissions.includes(permission) : false;
  };

  return (
    <user_role_listcontext.Provider
      value={{
        userList: state.userList,
        roleList: state.roleList,
        handleAddUser,
        handleEditUser,
        handleDeleteUser,
        handleAddRole,
        handleEditRole,
        handleDeleteRole,
        getCombinedUsers,
        getCombinedRoles,
        validateUserPermission,
      }}
    >
      {children}
    </user_role_listcontext.Provider>
  );
};
