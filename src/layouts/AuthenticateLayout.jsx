/* eslint-disable no-unused-vars */
import { Avatar, Divider, Dropdown, Layout, Menu, Typography } from "antd";
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
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
const { Sider, Content, Header } = Layout;

const LayoutEntry = ({ children }) => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const darkmode = useSelector((state) => state.setting.dark);

  const [selectedMenu, setSelectedMenu] = useState("overview");

  const itemsMenu = [
    {
      key: "overview",
      icon: <FaChartPie />,
      label: "Overview",
      isShow: user.role === "admin",
    },
    {
      key: "tickets",
      icon: <FaTicketSimple />,
      label: "Tickets",
      isShow: true,
    },
    {
      key: "ideas",
      icon: <FaLightbulb />,
      label: "Ideas",
      isShow: user.role === "admin",
    },
    {
      key: "contacts",
      icon: <HiMiniUserGroup />,
      label: "Contacts",
      isShow: user.role === "admin",
    },
    {
      key: "agents",
      icon: <FaUserTie />,
      label: "Agents",
      isShow: user.role === "admin",
    },
    {
      key: "articles",
      icon: <FaBook />,
      label: "Articles",
      isShow: user.role === "admin",
    },
    {
      key: "settings",
      icon: <IoMdSettings />,
      label: "Settings",
      isShow: user.role === "admin",
    },
    {
      key: "subscription",
      icon: <IoRibbonSharp />,
      label: "Subscriptions",
      isShow: user.role === "admin",
    },
  ];

  useEffect(() => {
    setSelectedMenu(location.pathname.split("/")[1]);
  }, [location]);

  const onClickMenu = (menu) => {
    navigate("/" + menu.key);
    setSelectedMenu(menu.key);
  };

  return (
    <Layout className={`h-[100vh] ${darkmode ? "dark" : ""}`}>
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
            items={itemsMenu.filter((res) => res.isShow)}
            onClick={onClickMenu}
          />
        </Content>
      </Sider>
      <Layout>
        <Header className="bg-transparent dark:bg-slate-800 flex justify-between items-center p-6 lg:p-[50px] ">
          <Typography.Text className="font-bold text-base text-black dark:text-gray-200 capitalize">
            {selectedMenu}
          </Typography.Text>
          <div className="flex items-center space-x-5">
            <FaSearch className="text-gray-400" />
            <FaBell className="text-gray-400" />
            <Divider type="vertical" />
            <Typography.Text className="capitalize">
              {user.username}
            </Typography.Text>
            <Dropdown
              menu={{
                items: [
                  {
                    key: "logout",
                    label: t("login.logout"),
                  },
                ],
                onClick: () => logout(),
              }}
            >
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
            </Dropdown>
          </div>
        </Header>
        <Content className="h-full overflow-y-scroll bg-transparent dark:bg-slate-800 p-6 lg:p-[50px] flex justify-center">
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
