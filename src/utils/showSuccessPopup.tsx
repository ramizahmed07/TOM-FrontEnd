import { Button, Modal as AntdModal } from "antd";

import CheckLogo from "@assets/images/check.png";

export const showSuccessPopup = ({
  title,
  desc,
  onClick,
}: {
  title: string;
  desc: string;
  onClick?: () => void;
}) => {
  const handleClick = () => {
    AntdModal.destroyAll();
    onClick && onClick();
  };
  AntdModal.info({
    className: "success__popup",
    icon: null,
    okButtonProps: { style: { display: "none" } },
    bodyStyle: { textAlign: "center" },
    content: (
      <div>
        <img src={CheckLogo} alt="check" />
        <div className="success__popup__title">{title}</div>
        <p className="success__popup__desc">{desc}</p>
        <Button onClick={handleClick} type="primary">
          Done
        </Button>
      </div>
    ),
  });
};
