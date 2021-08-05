import React from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import Countdown from "react-countdown";
import { Link, useHistory } from "react-router-dom";

import "../style.less";
import "./forgotPassword.less";
import AuthLandingImg from "@pages/admin/Auth/AuthLandingImg";
import { Paths } from "@router";

const Timer = ({ minutes, seconds }: { minutes: number; seconds: number }) => {
  const min = minutes !== 1 ? "00" : "01";
  const sec = seconds < 10 ? `0${seconds}` : seconds;
  return (
    <div className="timer-view">
      <h1 className="timer-minute">{min}</h1>
      <h1 className="timer-seconds">{sec}</h1>
    </div>
  );
};

const SendLinkView = () => {
  const history = useHistory();

  return (
    <>
      <Typography.Paragraph className="auth__form_title">
        Forgot your <span className="auth__company__name">Password?</span>
      </Typography.Paragraph>
      <Typography.Paragraph className="auth__form__prompt">
        Enter your registered email address below and we will send you a link to
        reset your password.
      </Typography.Paragraph>

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
          className="form__item forgot__pwd_email"
          label={<label className="input__label ">Email address</label>}
          name="email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input
            className="form__input"
            type="email"
            placeholder="Enter your email address here..."
          />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login__btn"
            size="large"
            onClick={() => {
              history.push(Paths.Auth.login);
            }}
          >
            Send link <ArrowRightOutlined />
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const ResendLinkView = () => {
  const history = useHistory();

  return (
    <div className="resend-link-container">
      <Typography.Paragraph className="auth__form_title">
        Check your <span className="auth__company__name">Email?</span>
      </Typography.Paragraph>
      <Typography.Paragraph className="auth__form__prompt">
        Kindly check your email! We have sent you a link to reset your password.
      </Typography.Paragraph>

      <div className="timer-container">
        <Countdown date={Date.now() + 60000} renderer={Timer} />

        <Typography.Paragraph className="auth__form__prompt">
          Didn’t receive email yet?
        </Typography.Paragraph>
      </div>

      <Button
        type="primary"
        htmlType="submit"
        className="login__btn"
        size="large"
        onClick={() => {
          history.push(Paths.Auth.login);
        }}
      >
        Resend link <ArrowRightOutlined />
      </Button>
    </div>
  );
};

const ForgotPassword = () => {
  return (
    <Row className="auth__container">
      <AuthLandingImg />

      <Col span={10} className="auth__right">
        <div className="auth__form__container">
          {false ? <SendLinkView /> : <ResendLinkView />}

          <Typography.Paragraph className="auth__form__prompt">
            Back to{" "}
            <Link
              className="auth__form__prompt backToLogin"
              to={Paths.Auth.login}
            >
              Login
            </Link>
          </Typography.Paragraph>
        </div>
      </Col>
    </Row>
  );
};

export default ForgotPassword;
