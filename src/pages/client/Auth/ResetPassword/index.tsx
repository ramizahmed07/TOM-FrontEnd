import { useHistory } from "react-router";
import { Col, Row, Typography, Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

import "@styles/auth.less";
import AuthLandingImg from "@components/AuthLandingImg";
import { Paths } from "@router";
import { useChangePasswordMutation } from "@services";
import { useTypedSelector } from "@hooks";

const ClientResetPassword = () => {
  const history = useHistory();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const auth = useTypedSelector(state => state.auth);
  const changeUserPassword = async (values: {
    password: string;
    retypePassword: string;
  }) => {
    const { password, retypePassword } = values;
    if (password !== retypePassword)
      return message.error("Passwords should be same");
    if (password.length < 8)
      return message.error(
        "This password is too short. It must contain at least 8 characters."
      );

    try {
      await changePassword({
        password,
        token: auth?.is_one_time_password
          ? auth?.token?.access
          : window.location.href.split("?token=")[1],
      }).unwrap();
      history.push(Paths.Auth.login);
    } catch (error) {
      console.log(error);
    }
  };

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
            onFinish={changeUserPassword}
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
              name="retypePassword"
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
              >
                {isLoading ? (
                  <LoadingOutlined className="spinner" />
                ) : (
                  "Reset Password"
                )}
              </Button>
            </Form.Item>
          </Form>

          <Typography.Paragraph className="auth__form__prompt">
            Back to{" "}
            <Link
              className="auth__form__prompt backToLogin"
              to={Paths.Auth.login}
            >
              Login?
            </Link>
          </Typography.Paragraph>
        </div>
      </Col>
    </Row>
  );
};

export default ClientResetPassword;
