import { Button } from "antd";

import { ReactComponent as UploadIcon } from "@assets/images/upload.svg";
import { btn_inferface } from "@/interfaces";

const UploadBtn: React.FC<btn_inferface> = ({ text, callback }) => {
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
