// auth.ts
type User = {
  email: string;
  password: string;
  role: string;
  permissions: string[];
};

const dummyUsers: User[] = [
  {
    email: "john.doe@example.com",
    password: "password123",
    role: "admin",
    permissions: ["read", "write", "delete"],
  },
  {
    email: "jane.doe@example.com",
    password: "securePass",
    role: "editor",
    permissions: ["read", "write"],
  },
];

// Store the logged-in user's data
let currentUser: User | null = null;

/**
 * Function to authenticate a user
 * @param email - The user's email
 * @param password - The user's password
 * @returns The authenticated user or an error
 */
export const login = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = dummyUsers.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        currentUser = user; // Set the current user
        resolve(user);
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000); // Simulated latency
  });
};

/**
 * Function to get the current user
 * @returns The currently logged-in user or null
 */
export const getCurrentUser = (): User | null => {
  return currentUser;
};

/**
 * Function to log out the user
 */
export const logout = (): void => {
  currentUser = null;
};

/**
 * Function to check if the current user has a specific permission
 * @param permission - The permission to check
 * @returns True if the user has the permission, false otherwise
 */
export const hasPermission = (permission: string): boolean => {
  return currentUser?.permissions.includes(permission) ?? false;
};
