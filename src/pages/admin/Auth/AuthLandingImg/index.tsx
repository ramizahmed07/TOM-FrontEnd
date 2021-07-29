import { Col, Typography } from "antd";

import "./style.less";
import loginPhoto from "@assets/images/login.png";
import { ReactComponent as Logo } from "@assets/images/logo.svg";

const AuthLandingImg = () => {
  return (
    <>
      <Col span={14} className="container">
        <img alt="login" src={loginPhoto} className="photo" />
        <div className="logo__container">
          <Logo />
        </div>
        <Typography.Title className="heading">
          Make it Simple, Make it Significant and Useful!
        </Typography.Title>
      </Col>
    </>
  );
};

export default AuthLandingImg;
