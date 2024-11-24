import { Typography } from "antd";

const { Text, Title } = Typography;
const Dashboard = () => {
  return (
    <div
      style={{
        marginTop: "30px",
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Title>Welcome to your dashboard!</Title>

      <Text>Here you can see user and role lists.</Text>
      <Text>You can also manage users, roles by your own role permission</Text>
    </div>
  );
};

export default Dashboard;
