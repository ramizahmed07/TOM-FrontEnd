import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Col, Row, Typography, Form, Input, Button, Checkbox } from "antd";

import "../style.less";
import AuthLandingImg from "@pages/admin/Auth/AuthLandingImg";
import { Paths } from "@router";
import { useLoginMutation } from "@services";

interface ILoginForm {
  email: string;
  password: string;
  remember: boolean;
}

const Login = () => {
  const history = useHistory();
  const [errorFields, setErrorFields] = useState([]);
  const [login, { isLoading }] = useLoginMutation();
  const [form] = Form.useForm();

  const onFinishedFailed = (errorInfo: any) => {
    setErrorFields(errorInfo.errorFields);
  };

  const signIn = async (values: ILoginForm) => {
    setErrorFields([]);
    const { email, password } = values;
    try {
      await login({
        email,
        password,
      }).unwrap();
      history.push(Paths.Dashboard.dashboard);
    } catch (error) {
      setErrorFields([{ errors: [error?.message], name: ["password"] }] as any);
      form.setFields([
        {
          name: "password",
          errors: [error?.message],
        },
      ]);
    }
  };
  console.log({ errorFields });

  const checkError = (name: string) =>
    errorFields?.some((x: any) => x.name.includes(name));

  return (
    <Row className="auth__container">
      <AuthLandingImg />
      <Col span={10} className="auth__right">
        <div className="auth__form__container">
          <Typography.Paragraph className="auth__form_title">
            Welcome to{" "}
            <span className="auth__company__name">Talent Accelerator</span>
          </Typography.Paragraph>
          <Typography.Paragraph className="auth__form__prompt">
            Login to your account to continue
          </Typography.Paragraph>
          {/* FORM */}
          <Form
            name="login"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={signIn}
            onFinishFailed={onFinishedFailed}
            layout="vertical"
            form={form}
            className="auth__form"
          >
            <Form.Item
              className="form__item"
              validateTrigger="onSubmit"
              label={
                <label
                  className={`${
                    checkError("email") ? "error__label" : "input__label"
                  }`}
                >
                  Email Address
                </label>
              }
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                {},
              ]}
            >
              <Input
                className="form__input"
                type="email"
                placeholder="Enter your email here..."
              />
            </Form.Item>

            <Form.Item
              className="form__item"
              validateTrigger="onSubmit"
              label={
                <div className="auth__password__label">
                  <label
                    className={
                      checkError("password") ? "error__label" : "input__label"
                    }
                  >
                    Password
                  </label>
                  <Link
                    to={Paths.Auth.forgot_password}
                    className="auth__forgot__password"
                  >
                    Forgot password?
                  </Link>
                </div>
              }
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                className="form__input error__pwd"
                placeholder="Enter your password here..."
              />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              className="auth__checkbox__item"
            >
              <Checkbox className="auth__checkbox">Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login__btn"
                size="large"
              >
                {isLoading ? (
                  <LoadingOutlined className="spinner" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
