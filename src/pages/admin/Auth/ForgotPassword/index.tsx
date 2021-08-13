import React, { useState } from "react";
import { Button, Col, Form, Input, message, Row, Typography } from "antd";
import { ArrowRightOutlined, LoadingOutlined } from "@ant-design/icons";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";

import "../style.less";
import "./forgotPassword.less";
import { ErrorServices, useResetPasswordMutation } from "@services";
import AuthLandingImg from "@pages/admin/Auth/AuthLandingImg";
import { Paths } from "@router";

interface IProps {
  sendLink: (email: string) => Promise<any>;
  email?: string;
}

interface ISendLinkView extends IProps {
  setIsEmailSent: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

const Timer = ({
  minutes,
  seconds,
  completed,
}: {
  minutes: number;
  seconds: number;
  completed: boolean;
}) => {
  const min = minutes !== 1 ? "00" : "01";
  const sec = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <div className="timer-view">
      <h1 className="timer-minute">{min}</h1>
      <h1 className="timer-seconds">{sec}</h1>
    </div>
  );
};

const SendLinkView = ({
  setIsEmailSent,
  isLoading,
  sendLink,
}: ISendLinkView) => {
  const [form] = Form.useForm();
  const [hasError, setHasError] = useState(false);

  const onFinishedFailed = () => setHasError(true);

  const onFinish = async (values: { email: string }) => {
    const { email } = values;
    try {
      await sendLink(email);
      message.success("Reset password link sent on your email");
      setIsEmailSent(true);
    } catch (error) {
      ErrorServices(error);
      setHasError(true);
      form.setFields([
        {
          name: "email",
          errors: [error?.message],
        },
      ]);
    }
  };
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
        onFinish={onFinish}
        onFinishFailed={onFinishedFailed}
        layout="vertical"
        form={form}
        className="auth__form"
      >
        <Form.Item
          className="form__item forgot__pwd_email"
          label={
            <label className={`${hasError ? "error__label" : "input__label"}`}>
              Email address
            </label>
          }
          validateTrigger="onSubmit"
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
          >
            Send link{" "}
            {isLoading ? (
              <LoadingOutlined className="spinner" />
            ) : (
              <ArrowRightOutlined />
            )}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const ResendLinkView = ({ sendLink, email }: IProps) => {
  const [key, setKey] = useState(1);
  const [disabled, setDisabled] = useState(true);

  const resendLink = async () => {
    try {
      await sendLink(email!);
      message.success("Reset password link sent on your email");
      setKey(prev => prev + 1);
      setDisabled(true);
    }
    catch (error) {
      ErrorServices(error);
    }
  }

  return (
    <div className="resend-link-container">
      <Typography.Paragraph className="auth__form_title">
        Check your <span className="auth__company__name">Email?</span>
      </Typography.Paragraph>
      <Typography.Paragraph className="auth__form__prompt">
        Kindly check your email! We have sent you a link to reset your password.
      </Typography.Paragraph>

      <div className="timer-container">
        <Countdown
          key={key}
          onComplete={() => {
            setDisabled(false);
          }}
          date={Date.now() + 60_000}
          renderer={Timer}
        />

        <Typography.Paragraph className="auth__form__prompt">
          Didn’t receive email yet?
        </Typography.Paragraph>
      </div>

      <Button
        type="primary"
        htmlType="submit"
        className="login__btn"
        size="large"
        disabled={disabled}
        onClick={resendLink}
      >
        Resend link <ArrowRightOutlined />
      </Button>
    </div>
  );
};

const ForgotPassword = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [email, setEmail] = useState("");

  const sendLink = (email: string) => {
    setEmail(email);
    return resetPassword({
      email,
    }).unwrap();
  };

  return (
    <Row className="auth__container">
      <AuthLandingImg />

      <Col span={10} className="auth__right">
        <div className="auth__form__container">
          {!isEmailSent ? (
            <SendLinkView
              sendLink={sendLink}
              isLoading={isLoading}
              setIsEmailSent={setIsEmailSent}
            />
          ) : (
            <ResendLinkView email={email} sendLink={sendLink} />
          )}

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
