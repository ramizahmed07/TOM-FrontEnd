import AuthLandingImg from "@/components/AuthLandingImg";
import RoutePaths from "@/routes/RoutePaths";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import "../style.less";

const ForgotPassword = () => {
    const history = useHistory();
  return (
    <Row className="login__container">
      <AuthLandingImg />

      <Col span={10} className="login__right">
        <div className="login__form__container">
          <Typography.Paragraph className="login__form_title">
            Forgot your <span className="login__company__name">Password?</span>
          </Typography.Paragraph>
          <Typography.Paragraph className="login__form__prompt">
            Enter your registered email address below and we will send you a
            link to reset your password.
          </Typography.Paragraph>

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
              label={<label className="input__label">Email address</label>}
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input
                className="form__input"
                type="email"
                placeholder="Enter your email here..."
              />
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
                Send link
              </Button>
            </Form.Item>
          </Form>

          <Typography.Paragraph className="login__form_title">
            Back to <a className="login__company__name" href={RoutePaths.Auth.login}>Login?</a>
          </Typography.Paragraph>
        </div>
      </Col>
    </Row>
  );
};

export default ForgotPassword;
