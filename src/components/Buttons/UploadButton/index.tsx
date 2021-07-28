import { Button } from "antd";

import { ReactComponent as UploadIcon } from "@assets/images/upload.svg";
import { BtnInterface } from "@/types";

const UploadBtn: React.FC<BtnInterface> = ({ text, callback }) => {
  return (
    <Button
      className="btn btn--upload"
      type="primary"
      onClick={callback}
      icon={<UploadIcon />}
      size="large"
    >
      <span>{text}</span>
    </Button>
  );
};

export default UploadBtn;
