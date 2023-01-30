import { Button, Checkbox, Form, Input, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setUserLogged }) => {
  const [disableBTN, setDisableBTN] = useState(true);
  const navigate = useNavigate();
  const onFinish = (values) => {
    const { username, password } = values;
    axios
      .post("http://localhost:4000/auth/login", {
        email: username,
        password,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUserLogged(true);
        message.success(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        message.error(err.response?.data.message);
      });
  };

  const onValuesChange = (_, values) => {
    const { username, password, remember } = values;
    username && password && remember
      ? setDisableBTN(false)
      : setDisableBTN(true);
  };
  return (
    <Form
      title="Login"
      onValuesChange={onValuesChange}
      className="h-screen !font-pop w-screen p-0 m-0 grid place-content-center"
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off">
      <h1 className="mb-5 p-2 font-bold text-3xl">Login</h1>
      <Form.Item
        label="Email"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
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
            message: "Please input your password!",
          },
        ]}>
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}>
        <Checkbox>Remember me</Checkbox>
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
          <Link to="/register" className="text-blue-500 font-bold font-pop">
            Register
          </Link>
        </Form.Item>
      </div>
    </Form>
  );
};

export default Login;
