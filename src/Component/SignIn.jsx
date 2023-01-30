import { Button, Checkbox, Form, Input, message } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const SignIn = () => {
  const [disableBTN, setDisableBTN] = useState(true);
  const reText = /^[a-zA-Z\-]+$/;
  const rePassword =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const onFinish = (values) => {
    const { username, password, name } = values;
    axios
      .post("http://localhost:4000/auth/register", {
        email: username,
        password,
        name,
      })
      .then((res) => {
        message.success(res.data.message);
      })
      .catch((err) => {
        message.error(err.response?.data.message);
      });
  };

  const onValuesChange = (_, values) => {
    const { username, password, name } = values;

    re.test(username) &&
    rePassword.test(password) &&
    reText.test(name) &&
    name.length >= 5
      ? setDisableBTN(false)
      : setDisableBTN(true);
  };
  return (
    <Form
      title="Register"
      onValuesChange={onValuesChange}
      className="h-screen !font-pop w-full p-0 m-0 grid place-content-center"
      name="basic"
      onFinish={onFinish}
      autoComplete="off">
      <h1 className="mb-5 p-2 font-bold text-3xl">Register</h1>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your name!",
            pattern: reText,
          },
          { min: 5, message: "Username must be minimum 5 characters." },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="username"
        rules={[
          {
            pattern: re,
            required: true,
            message: "Please input your email!",
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            pattern: rePassword,
            message: "Please input your password!",
          },
        ]}>
        <Input.Password />
      </Form.Item>

      <div className="flex justify-between align-middle content-center items-center  self-center">
        <Form.Item>
          <Button
            className="bg-blue-500 font-bold font-pop hover:!text-white text-white"
            htmlType="submit"
            disabled={disableBTN}>
            Submit
          </Button>
        </Form.Item>

        <Form.Item>
          <Link to="/login" className="text-blue-500 font-bold font-pop">
            Login
          </Link>
        </Form.Item>
      </div>
    </Form>
  );
};

export default SignIn;
