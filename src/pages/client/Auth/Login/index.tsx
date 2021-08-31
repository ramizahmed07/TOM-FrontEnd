import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Col, Row, Typography, Form, Input, Button, Checkbox } from "antd";

import "@styles/auth.less";
import AuthLandingImg from "@components/AuthLandingImg";
import { Paths } from "@router";

const ClientLogin = () => {
  return (
    <Row className="auth__container">
      <AuthLandingImg />
      <Col span={10} className="auth__right">
        <div className="auth__form__container">
          <Typography.Paragraph className="auth__form_title">
            Welcome to <span className="primary-color">Talent Accelerator</span>
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
            layout="vertical"
            className="auth__form"
          >
            <Form.Item
              className="form__item"
              validateTrigger="onSubmit"
              label={
                <label
                  className={`${
                    false ? "error__label" : "input__label"
                  } secondary-color`}
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
                    className={`${
                      false ? "error__label" : "input__label"
                    } secondary-color`}
                  >
                    Password
                  </label>
                  <Link
                    to={Paths.Auth.client_forgot_password}
                    className="auth__forgot__password link"
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
                {false ? <LoadingOutlined className="spinner" /> : "Sign In"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default ClientLogin;
