# RBAC UI Frontend

This project is a Role-Based Access Control (RBAC) User Interface built with React.js, designed to allow users to manage other users and their permissions dynamically based on their roles. The interface supports CRUD operations for both users and permissions, with role-based access to features.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Initial user data for Login:](#initial-user-data-for-login:)
- [Installation](#installation)

## Project Overview

The RBAC UI provides a role-based access control system to manage users and permissions. It allows administrators to:
- Add, edit, and delete users.
- Add, edit, and delete permissions.
- Change user roles (admin, editor, etc.), which dynamically changes their available permissions.

The app updates a user’s role and associated permissions when their role is changed (e.g., from admin to editor). Once logged in, the permissions corresponding to the user's role will be dynamically adjusted.

## Features

- **User Management**: 
  - Admins can add, edit, and delete users.
  - User permissions are tied to their role, and are dynamically updated when the user role changes.
  
- **Permissions Management**:
  - Admins can manage and assign permissions to different roles.
  - Permissions are directly linked to roles, and users inherit permissions based on their role.

- **Dynamic Role Changes**:
  - When an admin changes a user’s role (e.g., from admin to editor), their permissions are updated accordingly.
  - The application dynamically adapts to these role and permission changes.

- **Authentication & Authorization**:
  - Role-based access control ensures only authorized users (admins) can perform actions such as adding, editing, or deleting users and permissions.

## Tech Stack

- **React.js**: For building the user interface.
- **React Router**: For handling routing and navigation.
- **React Hook Form**: For handling forms in the application.
- **Ant Design (antd)**: For UI components and styling.
- **Zod**: For form validation.
- **Axios**: For making API requests.
- **Bootstrap**: For additional styling.

## Initial user data for Login:
 1. emial : john.doe@example.com
    password : password123
 2. email : jane.smith@example.com
    password: password456


## Installation

To get started with this project locally, follow the steps below:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MananModi182/RBCA_demo.git

2. **Navigate into the project directory**:
  ```bash
  cd RBCS_dem
```

3. ## Installation

To get started with this project locally, follow the steps below:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MananModi182/RBCA_demo.git

2. **Navigate into the project directory**:
  ```bash
  cd RBCS_dem
```
3.**Run the application: Start the development server**:
   ```bash
  npm run dev




