import { Layout } from "antd";
import { Navigate, useOutlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const { Sider, Content } = Layout;

const LayoutEntry = () => {
  return (
    <Layout>
      <Sider>
        <Content>
          <p>ini content</p>
        </Content>
      </Sider>
    </Layout>
  );
};
export const AuthenticatedLayout = () => {
  const outlet = useOutlet();
  const { user } = useAuth();

  if (!user?.token) {
    return <Navigate to="/sign-in" />;
  }
  return <LayoutEntry>{outlet}</LayoutEntry>;
};
