import { LoadingOutlined } from "@ant-design/icons";
import { Button as AntButton } from "antd";

import "./button.less";
import { IButton, Icons, Variant } from "./config";

const Button: React.FC<IButton & React.HTMLProps<HTMLButtonElement>> = ({
  onClick,
  children,
  variant,
  isLoading,
  className,
}) => {
  return (
    <AntButton
      className={`btn btn--${variant} ${className}`}
      type="primary"
      onClick={onClick}
      icon={
        <div className="btn__icon">
          {isLoading ? (
            <LoadingOutlined className="spinner" />
          ) : (
            Icons[variant as Variant]
          )}
        </div>
      }
      size="large"
    >
      <span className="btn__children">{children}</span>
    </AntButton>
  );
};

export default Button;
