import { Button as AntButton } from "antd";

import "./button.less";
import { ReactComponent as PlusIcon } from "@assets/images/plus.svg";
import { ReactComponent as UploadIcon } from "@assets/images/upload.svg";
import { ReactComponent as DownloadIcon } from "@assets/images/download.svg";

interface IButton {
  variant: "download" | "add" | "upload";
}

type Icon = React.SVGProps<SVGSVGElement>;

interface IIcons {
  download: Icon;
  upload: Icon;
  add: Icon;
}

const Icons: IIcons = {
  download: <DownloadIcon />,
  upload: <UploadIcon />,
  add: <PlusIcon fill="white" />,
};

type Variant = keyof IIcons;

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
