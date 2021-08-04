import { useHistory } from "react-router";
import { Col, Row, Typography, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";

import "../style.less";
import AuthLandingImg from "@pages/admin/Auth/AuthLandingImg";
import RoutePaths from "@routes/RoutePaths";

const ResetPassword = () => {
  const history = useHistory();

  return (
    <Row className="auth__container">
      <AuthLandingImg />

      <Col span={10} className="auth__right">
        <div className="auth__form__container">
          <Typography.Paragraph className="auth__form_title">
            Reset your <span className="auth__company__name">Password?</span>
          </Typography.Paragraph>
          <Typography.Paragraph className="auth__form__prompt">
            Enter your new password below
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
              label={
                <div className="auth__password__label">
                  <label className="input__label">Type new password</label>
                </div>
              }
              name="password"
              rules={[
                { required: true, message: "Please enter your new password!" },
              ]}
            >
              <Input.Password
                className="form__input"
                placeholder="Enter your password here..."
              />
            </Form.Item>

            <Form.Item
              className="form__item"
              label={
                <div className="auth__password__label">
                  <label className="input__label">Re-type new password</label>
                </div>
              }
              name="retype-password"
              rules={[
                {
                  required: true,
                  message: "Please re-enter your new password!",
                },
              ]}
            >
              <Input.Password
                className="form__input"
                placeholder="Re-Enter your new password here..."
              />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login__btn"
                size="large"
                onClick={() => {
                  history.push(RoutePaths.Auth.login);
                }}
              >
                Reset Password
              </Button>
            </Form.Item>
          </Form>

          <Typography.Paragraph className="auth__form__prompt">
            Back to{" "}
            <Link
              className="auth__form__prompt backToLogin"
              to={RoutePaths.Auth.login}
            >
              Login?
            </Link>
          </Typography.Paragraph>
        </div>
      </Col>
    </Row>
  );
};

export default ResetPassword;
