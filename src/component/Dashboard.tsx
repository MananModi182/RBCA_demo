import { useContext } from "react";
import { AuthContext } from "../store/authcontext";

const Dashboard = () => {
  const { currentUser, isLoggedIn } = useContext(AuthContext);

  return (
    <div className="container mt-4">
      {isLoggedIn ? (
        <>
          <h1>Welcome, {currentUser?.name}</h1>
          <p>Your role: {currentUser?.role}</p>
        </>
      ) : (
        <p>Please Login to continue.</p>
      )}
    </div>
  );
};

export default Dashboard;
