import { useHistory } from "react-router";
import { Col, Row, Typography, Form, Input, Button, Checkbox } from "antd";

import "../style.less";
import AuthLandingImg from "@pages/admin/Auth/AuthLandingImg";
import RoutePaths from "@routes/RoutePaths";

const Login = () => {
  const history = useHistory();
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
            onFinish={() => {}}
            layout="vertical"
            className="auth__form"
          >
            <Form.Item
              className="form__item"
              label={<label className="input__label">Email Address</label>}
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input
                className="form__input"
                type="email"
                placeholder="Enter your email here..."
              />
            </Form.Item>

            <Form.Item
              className="form__item"
              label={
                <div className="auth__password__label">
                  <label className={false ? "input__label" : "error__label"}>
                    Password
                  </label>
                  <Button type="link" className="auth__forgot__password">
                    Forgot password?
                  </Button>
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

            <Typography.Paragraph className="auth__error__msg">
              You have entered incorrect password
            </Typography.Paragraph>

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
                onClick={() => {
                  history.push(RoutePaths.Home.settings);
                }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
