/* eslint-disable no-unused-vars */
import { Avatar, Divider, Layout, Menu, Typography } from "antd";
import {
  Navigate,
  useLocation,
  useNavigate,
  useOutlet,
} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  FaBell,
  FaBook,
  FaChartPie,
  FaLightbulb,
  FaSearch,
  FaUserTie,
} from "react-icons/fa";
import { TbSquareRoundedLetterDFilled } from "react-icons/tb";
import { FaTicketSimple } from "react-icons/fa6";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoMdSettings } from "react-icons/io";
import { IoRibbonSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
const { Sider, Content, Header } = Layout;

const LayoutEntry = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedMenu, setSelectedMenu] = useState("overview");

  const itemsMenu = [
    {
      key: "overview",
      icon: <FaChartPie />,
      label: "Overview",
    },
    {
      key: "tickets",
      icon: <FaTicketSimple />,
      label: "Tickets",
    },
    {
      key: "ideas",
      icon: <FaLightbulb />,
      label: "Ideas",
    },
    {
      key: "contacts",
      icon: <HiMiniUserGroup />,
      label: "Contacts",
    },
    {
      key: "agents",
      icon: <FaUserTie />,
      label: "Agents",
    },
    {
      key: "articles",
      icon: <FaBook />,
      label: "Articles",
    },
    {
      key: "settings",
      icon: <IoMdSettings />,
      label: "Settings",
    },
    {
      key: "subscription",
      icon: <IoRibbonSharp />,
      label: "Subscriptions",
    },
  ];

  useEffect(() => {
    setSelectedMenu(location.pathname.split("/")[1]);
  }, []);

  const onClickMenu = (menu) => {
    navigate("/" + menu.key);
    setSelectedMenu(menu.key);
  };

  return (
    <Layout className="h-[100vh]">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Content>
          <div className="flex items-center gap-2 p-5">
            <TbSquareRoundedLetterDFilled size={36} color="#1890ff" />
            <Typography.Text className="font-bold text-sm">
              Dashboard Kit
            </Typography.Text>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedMenu]}
            items={itemsMenu}
            onClick={onClickMenu}
          />
        </Content>
      </Sider>
      <Layout>
        <Header className="bg-transparent flex justify-between items-center">
          <Typography.Text className="font-bold text-base text-black capitalize">
            {selectedMenu}
          </Typography.Text>
          <div className="flex items-center space-x-5">
            <FaSearch className="text-gray-400" />
            <FaBell className="text-gray-400" />
            <Divider type="vertical" />
            <Typography.Text className="capitalize">
              {user.username}
            </Typography.Text>
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
          </div>
        </Header>
        <Content className="h-full overflow-y-scroll bg-transparent p-[50px] flex justify-center">
          <div className="max-w-[1400px] w-full">{children}</div>
        </Content>
      </Layout>
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
