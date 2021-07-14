import { useHistory } from "react-router";
import { Col, Row, Typography, Form, Input, Button, Checkbox } from "antd";

import "./login.less";
import loginPhoto from "@assets/images/login.png";
import { ReactComponent as Logo } from "@assets/images/logo.svg";

const Login = () => {
  const history = useHistory();
  return (
    <Row className="login__container">
      <Col span={14} className="login__left">
        <img alt="login" src={loginPhoto} className="login__photo" />
        <div className="login__photo__overlay"></div>
        <div className="login__logo__container">
          <Logo />
        </div>

        <Typography.Title className="login__heading">
          Make it Simple, Make it Significant and Useful!
        </Typography.Title>
      </Col>
      <Col span={10} className="login__right">
        <div className="login__form__container">
          <Typography.Paragraph className="login__form_title">
            Welcome to{" "}
            <span className="login__company__name">Talent Accelerator</span>
          </Typography.Paragraph>
          <Typography.Paragraph className="login__form__prompt">
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
            className="login__form"
            // onFinishFailed={onFinishFailed}
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
                <div className="login__password__label">
                  <label className="input__label">Password</label>
                  <Button type="link" className="login__forgot__password">
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
                className="form__input"
                placeholder="Enter your password here..."
              />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              className="login__checkbox__item"
            >
              <Checkbox className="login__checkbox">Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login__btn"
                size="large"
                onClick={() => {
                  history.push("/");
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
