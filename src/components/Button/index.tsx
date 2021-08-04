import { Button as AntButton } from "antd";

import "./button.less";
import { IButton, Icons, Variant } from "./config";

const Button: React.FC<IButton & React.HTMLProps<HTMLButtonElement>> = ({
  onClick,
  children,
  variant,
}) => {
  return (
    <AntButton
      className={`btn btn--${variant}`}
      type="primary"
      onClick={onClick}
      icon={Icons[variant as Variant]}
      size="large"
    >
      <span>{children}</span>
    </AntButton>
  );
};

export default Button;
