import { Button } from "antd";

import { ReactComponent as DownloadIcon } from "@assets/images/download.svg";

const DownloadBtn: React.FC<React.HTMLProps<HTMLButtonElement>> = ({
  children,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      className="btn btn--download"
      icon={<DownloadIcon />}
      size="large"
    >
      <span>{children}</span>
    </Button>
  );
};

export default DownloadBtn;
