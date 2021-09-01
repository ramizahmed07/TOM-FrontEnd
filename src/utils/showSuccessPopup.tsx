import { Button, Modal as AntdModal } from "antd";

import CheckLogo from "@assets/images/check.png";
import ClientCheckLogo from "@assets/images/client-check.png";

export const showSuccessPopup = ({
  title,
  desc,
  onClick,
  role = "admin",
}: {
  title: string;
  desc: string;
  role?: "admin" | "client";
  onClick?: () => void;
}) => {
  const handleClick = () => {
    AntdModal.destroyAll();
    onClick && onClick();
  };
  AntdModal.info({
    className: `success__popup ${
      role === "client" && "success__popup--client"
    }`,
    icon: null,
    okButtonProps: { style: { display: "none" } },
    bodyStyle: { textAlign: "center" },
    content: (
      <div className="success__popup__content">
        <img
          src={role === "client" ? ClientCheckLogo : CheckLogo}
          alt="check"
        />
        <div className="success__popup__title">{title}</div>
        <p className="success__popup__desc">{desc}</p>
        <Button
          className="success__popup__btn"
          onClick={handleClick}
          type="primary"
        >
          Done
        </Button>
      </div>
    ),
  });
};
