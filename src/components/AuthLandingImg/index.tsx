import React from "react";
import { Col, Typography } from "antd";

import loginPhoto from "@assets/images/login.png";
import { ReactComponent as Logo } from "@assets/images/logo.svg";

const AuthLandingImg = () => {
  return (
    <>
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
    </>
  );
};

export default AuthLandingImg;
