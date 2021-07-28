import { Button } from "antd";

import { ReactComponent as UploadIcon } from "@assets/images/upload.svg";

const UploadBtn: React.FC<React.HTMLProps<HTMLButtonElement>> = ({
  onClick,
  children,
}) => {
  return (
    <Button
      className="btn btn--upload"
      type="primary"
      onClick={onClick}
      icon={<UploadIcon />}
      size="large"
    >
      <span>{children}</span>
    </Button>
  );
};

export default UploadBtn;
