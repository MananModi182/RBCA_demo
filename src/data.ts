export const dummyUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    phoneNumber: "+1234567890",
    role: "Admin",
    isActive: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "password456",
    phoneNumber: "+0987654321",
    role: "Editor",
    isActive: false,
  },
];

export const roles = [
  {
    id: "1",
    name: "Admin",
    permissions: ["Create", "Read", "Update", "Delete"],
  },
  { id: "2", name: "Editor", permissions: ["Read", "Update"] },
  { id: "3", name: "Viewer", permissions: ["Read"] },
];
