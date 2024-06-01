/* eslint-disable no-unused-vars */
import { Button, Form, Input, Typography, notification } from "antd";
import { TbSquareRoundedLetterDFilled } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";
import { AuthService } from "../../_mock-api";

import UsersData from "../../_mock-data/users.json";
import { useState } from "react";

const Index = () => {
  const { login } = useAuth();

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

    // AuthService.login(payload)
    //   .then((res) => {
    //     console.log("res ", res);
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //   });
  };
  return (
    <div className="flex h-[100vh] w-full items-center justify-center bg-black">
      <div className="w-[350px] bg-white p-6 rounded-md flex flex-col items-center">
        <TbSquareRoundedLetterDFilled size={36} color="#1890ff" />
        <Typography.Paragraph className="font-bold">
          Dashboard kit
        </Typography.Paragraph>
        <Typography.Title level={4} className="!text-black">
          Log In to Dashboard Kit
        </Typography.Title>
        <Typography.Paragraph className="text-xs">
          Enter your email and password below
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
              Log In
            </Button>
          </Form.Item>
        </Form>
        <Typography.Paragraph className="text-xs">
          Don&apos;t have an account? <a>Sign Up</a>
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default Index;
