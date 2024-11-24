import { Route, Routes } from "react-router-dom";
import Header from "./component/header";
import Layout from "./component/Layout";
import { UserRoleListProvider } from "./store/userliststore";
import Dashboard from "./component/Dashboard";
import UserList from "./component/User/Userlist";
import RoleList from "./component/Role/rolelist";

const App = () => {
  return (
    <UserRoleListProvider>
      <main className="">
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/rolelist" element={<RoleList />} />
          </Routes>
        </Layout>
      </main>
    </UserRoleListProvider>
  );
};

export default App;
