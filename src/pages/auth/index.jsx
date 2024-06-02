/* eslint-disable no-unused-vars */
import { Button, Form, Input, Typography, notification } from "antd";
import { TbSquareRoundedLetterDFilled } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";

import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import UsersData from "../../_mock-data/users.json";
import { useSelector } from "react-redux";

const Index = () => {
  const { t } = useTranslation();
  const { login } = useAuth();

  const darkMode = useSelector((state) => state.setting.dark);

  const [loading, setLoading] = useState(false);

  const submitForm = (e) => {
    setLoading(true);

    const foundUser = UsersData.find(
      (user) => user.email === e.email && user.password === e.password
    );

    if (foundUser) {
      const randomToken = Math.random().toString(36).substring(2, 7);
      setTimeout(() => {
        login({ ...foundUser, token: randomToken });
        setLoading(false);
      }, 1000);
    } else {
      notification.error({
        message: "Login Failed",
        description: "Email or password not found",
      });
      setLoading(false);
    }
  };
  return (
    <div
      className={`${
        darkMode ? "dark" : ""
      } flex h-[100vh] w-full items-center justify-center bg-black dark:bg-dark`}
    >
      <div className="w-[350px] bg-white dark:bg-dark border p-6 rounded-md flex flex-col items-center">
        <TbSquareRoundedLetterDFilled size={36} color="#1890ff" />
        <Typography.Paragraph className="font-bold">
          Dashboard kit
        </Typography.Paragraph>
        <Typography.Title level={4} className="text-black dark:text-gray-200">
          {t("login.loginTo")} Dashboard Kit
        </Typography.Title>
        <Typography.Paragraph className="text-xs">
          {t("login.enterEmailAndPassword")}
        </Typography.Paragraph>

        <Form
          layout="vertical"
          className="mt-5 w-full"
          onFinish={submitForm}
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label={
              <Typography.Paragraph className="text-xs">
                EMAIL
              </Typography.Paragraph>
            }
            rules={[
              { required: true, message: "Please input your email!" },
              {
                type: "email",
                message: "Please input valid E-mail!",
              },
            ]}
          >
            <Input type="email" placeholder="Email address" />
          </Form.Item>
          <Form.Item
            name="password"
            label={
              <Typography.Paragraph className="text-xs">
                PASSWORD
              </Typography.Paragraph>
            }
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 8, message: "Password must be at least 8 characters" },
            ]}
          >
            <Input.Password type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              className="w-full"
              htmlType="submit"
              loading={loading}
              disabled={loading}
            >
              {t("login.btnLogin")}
            </Button>
          </Form.Item>
        </Form>
        <Trans
          i18nKey="login.dontHaveAnAccount"
          components={{ 1: <Typography.Paragraph />, 2: <a /> }}
        >
          <Typography.Paragraph className="text-xs">
            Don&apos;t have an account? <a>Sign Up</a>
          </Typography.Paragraph>
        </Trans>
      </div>
    </div>
  );
};

export default Index;
